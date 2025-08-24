const express = require('express')
const router = express.Router()
const { addPassword, getPasswords, updatePassword, deletePassword } = require('../controllers/passwordController.js')
const { protect } = require('../middlewares/authMiddleware.js')
const { addPasswordValidation, updatePasswordValidation } = require('../validators/passwordValidator.js')
const validateRequest = require('../middlewares/validateRequest.js')
const checkSubscriptionStatus = require('../middlewares/checkSubscriptionStatus.js')
const passwordLimit = require('../middlewares/passwordLimit.js')

router.post('/', protect, checkSubscriptionStatus, passwordLimit, addPasswordValidation, validateRequest, addPassword)
router.get('/', protect, checkSubscriptionStatus, getPasswords)
router.put('/:id', protect, checkSubscriptionStatus, updatePasswordValidation, validateRequest, updatePassword)
router.delete('/:id', protect, checkSubscriptionStatus, deletePassword)

module.exports = router;