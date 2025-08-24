const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan: {
        type: String,
        enum: ["basic","premium"],
        required: true
    },
    stripeSessionId: {
        type: String,
        required: false,
        uniue: true
    },

    stripeCustomerId: {
        type: String,
        required: false,
        unique: true
    },

    status: {
        type: String,
        enum: ["incomplete", "trialing", "active", "past_due", "canceled", "unpaid"],
        default: "incomplete"
    },

    startDate: Date,
    endDate: Date
}, { timestamps: true })

module.exports = mongoose.models.subscription || mongoose.model("Subscription", subscriptionSchema);