const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter your email address"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    avatar: {
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    isActivate: {
        type: Number,
        default: 0
    },
    activateAccountToken: String,
    resetPasswordToken: String,
    activateAccountDate: Date,
    resetPasswordExpire: Date
})

userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) 
        next();

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
}

userSchema.methods.getActivateAcount = function() {
    const ActivateToken = crypto.randomBytes(20).toString('hex');
    this.activateAccountToken = crypto.createHash('sha256').update(ActivateToken).digest('hex');
    this.activateAccountDate = Date.now() + 100 * 365 * 24 * 60 * 60 * 1000;
    return ActivateToken;
}

module.exports = mongoose.model('User', userSchema);