const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail.js')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'User already exists' })

        await User.create({
            username,
            email,
            password,
        })

        res.status(201).json({ message: 'User registered successfully' })

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'user not found' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const token = generateToken(user._id)

        console.log("Login password:", password);
        console.log("Stored hash:", user.password);
        console.log("Match:", isMatch);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: 'Login successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error('login error:', err)
        res.status(500).json({ message: 'Server error during login' })
    }
}

exports.logoutUser = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    })
    res.status(200).json({ message: 'Logout successfully' })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const resetToken = user.generateResetToken();
        await user.save({ validateBeforeSave: false })

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
            <p>Hey <b>${user.username}</b>,</p>
            <p>You requested to reset your password 🔐.</p>
            <p>Click the link below to proceed (valid for 15 mins):</p>
            <a href="${resetURL}" style="color:green;font-weight:bold;">Reset Password</a>
            <p>If this wasn't you, ignore this email.</p>
            <p>– Team PassOP</p>
        `;

        await sendEmail(user.email, "Reset your PassOP password", message)

        res.status(200).json({ message: "Reset email sent successfully" });
        console.log("email sent")
    } catch (err) {
        console.error("mail sending error", err)
        res.status(500).json({ message: "Failed to sent mail" })
    }
}

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json("Invalid or expired token")
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "password reset successfully" })
    } catch (err) {
        console.error("password resetting error", err)
        res.status(500).json({ message: "Failed to reset password" })
    }
}

exports.googleLogin = (req, res) => {

    const token = generateToken(req.user._id)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect('https://passop-zeta-peach.vercel.app/');
}

exports.checkAuth = async(req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(200).json({ isAuthenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        
        if(!user){
            return res.status(200).json({isAuthenticated: false})
        }

        return res.status(200).json({isAuthenticated: true, user})
    } catch (err) {
        console.log("checkau error", err)
        res.status(200).json({ isAuthenticated: false });
    }
}

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(403).json({ message: "user not found" })
        }

        if (user.provider === 'google') {
            return res.status(403).json({
                message: "Password change is not allowed for Google account users. Please use Google to login.",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid old password" })
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "password changed successfully" });
    } catch (err) {
        console.error("password change error ", err)
        return res.status(500).json({ message: "failed to change the password" });
    }
}
