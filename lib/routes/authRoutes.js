const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, googleLogin, checkAuth, changePassword } = require('../controllers/authController.js')
const { registerValidation, loginValidation, forgotValidation, resetPasswordValidation, changePasswordValidation } = require('../validators/authValidator.js')
const validateRequest = require('../middlewares/validateRequest.js')
const { protect } = require('../middlewares/authMiddleware.js')
const passport = require('passport')

const router = express.Router();

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post('/logout',protect, logoutUser);

router.post('/forgot-password', forgotValidation, validateRequest, forgotPassword)
router.post('/reset-password/:token', resetPasswordValidation, validateRequest, resetPassword)
router.put('/changepassword', protect, changePasswordValidation, validateRequest, changePassword)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), googleLogin)

router.get('/check-auth',protect, checkAuth);

module.exports = router;