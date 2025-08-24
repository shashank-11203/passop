const Password = require('../models/Password.js');

const passwordLimit = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role === 'premium') {
            return next();
        }
        const passwordCount = await Password.countDocuments({ user: user._id });
        if(passwordCount >= process.env.PASSWORD_COUNT){
            return res.status(403).json({
                message: "You've reached your limit of basic plan — unlock unlimited storage with Premium 🚀"
            })
        }
        next();
    } catch (err) {
        console.error("Error in password limit middleware:", err)
        return res.status(500).json({
            message: 'Password limit middleware error',
        });
    }
}

module.exports = passwordLimit;