const Subscription = require('../models/Subscription.js');
const User = require('../models/User.js');

const checkSubscriptionStatus = async (req, res, next) => {
    const user = req.user;

    const subscription = await Subscription.findOne({ userId: user._id }).sort({ createdAt: -1 })
    if (subscription && subscription.status === "active") {
        const now = new Date();

        if (subscription.endDate && now > subscription.endDate) {
            subscription.status = "expired";
            await subscription.save();

            const dbUser = await User.findById(user._id);
            dbUser.role = "basic";
            await dbUser.save();
        }
    }
    next();
}

module.exports = checkSubscriptionStatus;