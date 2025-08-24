const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    subcription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcription',
        default: null
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    role:{
        type: String,
        required: false,
        enum: ["basic", "premium"],
        default: "basic",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000

    return resetToken;
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)