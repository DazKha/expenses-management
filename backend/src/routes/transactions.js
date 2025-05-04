const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', transactionController.getAll);

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Private
router.get('/:id', transactionController.getById);

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', transactionController.create);

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', transactionController.update);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', transactionController.delete);

// @route   GET /api/transactions/summary
// @desc    Get transaction summary
// @access  Private
router.get('/summary/stats', transactionController.getSummary);

module.exports = router;
