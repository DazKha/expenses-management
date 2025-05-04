const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;
