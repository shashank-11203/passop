const User = require('../models/User')
const Subscription = require('../models/Subscription')

exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const premiumUsers = await User.countDocuments({ role: 'premium' });
        const basicUsers = await User.countDocuments({ role: 'basic' });

        const totalSubscriptions = await Subscription.countDocuments();

        res.status(200).json({
            totalUsers,
            premiumUsers,
            basicUsers,
            totalSubscriptions
        })
    } catch (err) {
        console.error("Erron fetching user stats:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({ users })
    } catch (err) {
        console.error("Error fetching all users:", err);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (req.user._id.toString() === userId) {
        return res.status(403).json({ error: 'You cannot delete your own account' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subscription = await Subscription.findOne({ user: userId });
        if (subscription) {
            await Subscription.deleteOne({ user: userId });
        }

        await User.deleteOne({ _id: userId });
        
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: 'Failed to delete user' });
    }
}