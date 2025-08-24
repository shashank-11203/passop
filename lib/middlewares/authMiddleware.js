const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

exports.protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Not autherized, login to continue' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized, token invalid' });
    }
}

exports.isAdmin = async (req, res, next) => {
    if (req.user?.isAdmin) {
        return next();
    } else {
        return res.status(403).json({ message: 'Access denied, admin only.' });
    }
}