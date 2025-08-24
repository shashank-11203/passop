const express = require('express');
const { getUserStats, getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/stats', protect, isAdmin, getUserStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router;