const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/budgets
// @desc    Get all budgets
// @access  Private
router.get('/', budgetController.getAll);

// @route   GET /api/budgets/:id
// @desc    Get budget by ID
// @access  Private
router.get('/:id', budgetController.getById);

// @route   POST /api/budgets
// @desc    Create a new budget
// @access  Private
router.post('/', budgetController.create);

// @route   PUT /api/budgets/:id
// @desc    Update a budget
// @access  Private
router.put('/:id', budgetController.update);

// @route   DELETE /api/budgets/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', budgetController.delete);

// @route   GET /api/budgets/current/status
// @desc    Get current month budget status
// @access  Private
router.get('/current/status', budgetController.getCurrentMonthStatus);

module.exports = router;
