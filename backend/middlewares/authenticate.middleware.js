const jwt = require('jsonwebtoken');

const User = require('../models/user.Model')

const ErrorResponse = require('../utils/ErrorResponse');
const catchAsyncError = require('./catchAsyncError.middleware');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) 
        return next(new ErrorResponse('Login first to access this resource'), 401);

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id);

    next();
})

exports.authorizeUserRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new ErrorResponse(`Role (${req.user.role}) is not allowed to access this resource`, 403));
    
        next();
    }
}