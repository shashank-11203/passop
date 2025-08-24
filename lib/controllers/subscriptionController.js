const Stripe = require('stripe')
const Subscription = require('../models/Subscription');
const User = require('../models/User')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const priceMap = {
    premium: process.env.STRIPE_PREMIUM_PRICE_ID,
}

exports.createCheckoutSession = async (req, res) => {
    const { plan } = req.body;
    const user = req.user;

    const existingUser = await Subscription.findOne({ userId: user._id }).sort({ createdAt: -1 })

    if (existingUser && existingUser.status === "active") {
        return res.status(400).json({ message: "You already have an active subscription" })
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [{
                price: priceMap[plan],
                quantity: 1,
            }],
            customer_email: user.email,
            success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
        });

        return res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Stripe session error:", err);
        return res.status(500).json({ message: "Failed to create Stripe session" });
    }
};

// exports.markUserPremium = async (req, res) => {
//     const { session_id } = req.body;
//     const user = req.user;

//     try {
//         const session = await stripe.checkout.sessions.retrieve(session_id);

//         if (!session || session.payment_status !== 'paid') {
//             return res.status(400).json({ message: "Payment not verified" });
//         }

//         const existingSub = await Subscription.findOne({
//             userId: user._id,
//             stripeSessionId: session_id
//         })

//         let subscription;

//         const current = new Date();
//         const end = new Date();
//         end.setDate(current.getDate() + 30);        

//         if (existingSub) {
//             existingSub.status = "active";
//             existingSub.plan = "premium";
//             existingSub.startDate = current;
//             existingSub.endDate = end;
//             existingSub.stripeSessionId = session_id;
//             subscription = await existingSub.save();

//             const fullUser = await User.findById(user._id);
//             if (fullUser.role !== "premium") {
//                 fullUser.role = "premium";
//                 await fullUser.save();
//             }
//             return res.status(400).json({ message: "Subscription already exists" });
//         }

//         subscription = await Subscription.create({
//             userId: user._id,
//             plan: "premium",
//             status: "active",
//             startDate: current,
//             endDate: end,
//             stripeSessionId: session_id,
//             stripeCustomerId: session.customer
//         });

//         const fullUser = await User.findById(user._id)
//         fullUser.role = "premium";
//         fullUser.subcription = subscription._id;
//         await fullUser.save();

//         res.status(200).json({ message: "Subscription saved" });
//     } catch (err) {
//         console.error("Mark premium error:", err);
//         res.status(500).json({ message: "Error saving subscription" });
//     }
// }

exports.markUserPremium = async (req, res) => {
    const { session_id } = req.body;
    const user = req.user;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (!session || session.payment_status !== 'paid') {
            return res.status(400).json({ message: "Payment not verified" });
        }

        const current = new Date();
        const end = new Date();
        end.setDate(current.getDate() + 30);

        const existingSub = await Subscription.findOne({
            userId: user._id,
            stripeSessionId: session_id
        });

        let subscription;

        if (existingSub) {
            // Just update and return success
            existingSub.status = "active";
            existingSub.plan = "premium";
            existingSub.startDate = current;
            existingSub.endDate = end;
            subscription = await existingSub.save();
            return res.status(200).json({ message: "Subscription already exists", subscription });
        }

        // Create new subscription
        subscription = await Subscription.create({
            userId: user._id,
            plan: "premium",
            status: "active",
            startDate: current,
            endDate: end,
            stripeSessionId: session_id,
            stripeCustomerId: session.customer
        });

        // Update user role and subscription
        const fullUser = await User.findById(user._id);
        fullUser.role = "premium";
        fullUser.subcription = subscription._id;
        await fullUser.save();

        res.status(200).json({ message: "Subscription saved", subscription });
    } catch (err) {
        console.error("Mark premium error:", err);
        res.status(500).json({ message: "Error saving subscription" });
    }
};


exports.getUserTransaction = async (req, res) => {
    const user = req.user;

    try {
        const transactions = await Subscription.find({ userId: user._id }).sort({ createdAt: -1 })
        return res.status(200).json({ transactions })
    } catch (err) {
        console.error("Fetch transactions error: ", err);
        return res.status(500).json({ message: "Failed to fetch transactions" })
    }
}