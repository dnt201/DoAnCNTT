const crypto = require('crypto');

const User = require('../models/user.Model');

const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");

// Register User => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    })

    const activateToken = user.getActivateAcount();
    await user.save({validateBeforeSave: false});

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/activate/${activateToken}`;
    const message = `Welcome to our shop, you can activate your account at this link:\n\n${resetUrl}\n\nIf you have not request this email, then ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'ShopND Activate Your Account',
            message
        })

    }
    catch (error){
        user.activateAccountToken = undefined;
        user.activateAccountDate = undefined;

        await user.save({validateBeforeSave: false})

        return next(new ErrorResponse(error.message, 500))
    }

    sendToken(user, 200, res)
})

//Login User => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;

    //Not exist email or password
    if (!email || !password)
        return next(new ErrorResponse("Please enter email and password", 400))

    const user = await User.findOne({email: email}).select('+password');

    //Not Found user
    if (!user) return next(new ErrorResponse("Invalid email or password", 401));
    if (!user.isActivate) return next(new ErrorResponse("Please check email to activate account", 401));

    //comparePassword
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorResponse("Invalid email or password", 401));

    sendToken(user, 200, res);
})

//Logout User => /api/v1/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'User logged out'
    })
})

//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findOne({email: req.body.email});

    if (!user) return next(new ErrorResponse('User not found with this email', 404));
    

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token in as follow:\n\n${resetUrl}\n\nIf you have not request this email, then ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'ShopND Password Recovery',
            message
        })
    }
    catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false})
        return next(new ErrorResponse(error.message, 500))
    }
    res.status(200).json({success: true, data: "Email sent"});
})

//resetPassword => api/v1/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if (!user) return next(new ErrorResponse("Password reset token invalid or has been expired", 400));
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorResponse("Password does not match", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
})

//Activate account => /api/1/activate/:token
exports.activateAccount = catchAsyncError(async (req, res, next) => {
    
    const activateAccountToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
        activateAccountToken,
        activateAccountDate: {$gt: Date.now()}
    })

    if (!user) return next(new ErrorResponse("Activate account token invalid or has been expired", 400));

    user.isActivate = 1;
    user.activateAccountToken = undefined;
    user.activateAccountDate = undefined;

    await user.save();
    res.redirect('/login');
})

//User Profile => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//Update Password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) return next(new ErrorResponse('Old password is incorrect',400));
    if (req.user.password !== req.user.confirmPassword) return next(new ErrorResponse('Password Confirm does not match', 400))

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
})

//Update Profile => /api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Get all user =>/api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Get user detail => /api/v1/admin/user/:id
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorResponse(`User does not found with id ${req.params.id}`));

    res.status(200).json({
        success: true,
        user
    })
})

//Update user detail => /api/v1/admin/user/:id
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        //email: req.body.email, 
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user,
    })
})

//Delete User => /api/v1/admin/user/:id
exports.deleteProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorResponse(`User does not found with id ${req.params.id}`));

    await user.remove()

    res.status(200).json({
        success: true,
        user
    })
})