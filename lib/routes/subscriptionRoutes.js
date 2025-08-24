const express = require('express')
const router = express.Router()
const { createCheckoutSession, markUserPremium, getUserTransaction } = require('../controllers/subscriptionController')
const { protect } = require('../middlewares/authMiddleware')

router.post("/create", protect, createCheckoutSession)
router.post("/mark-premium", protect, markUserPremium)
router.get("/my-transactions", protect, getUserTransaction)

module.exports = router;