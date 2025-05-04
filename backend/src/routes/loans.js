const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middlewares/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/loans
// @desc    Get all loans/debts
// @access  Private
router.get('/', loanController.getAll);

// @route   GET /api/loans/:id
// @desc    Get loan/debt by ID
// @access  Private
router.get('/:id', loanController.getById);

// @route   POST /api/loans
// @desc    Create a new loan/debt
// @access  Private
router.post('/', loanController.create);

// @route   PUT /api/loans/:id
// @desc    Update a loan/debt
// @access  Private
router.put('/:id', loanController.update);

// @route   DELETE /api/loans/:id
// @desc    Delete a loan/debt
// @access  Private
router.delete('/:id', loanController.delete);

// @route   POST /api/loans/:id/paid
// @desc    Mark a loan/debt as paid
// @access  Private
router.post('/:id/paid', loanController.markAsPaid);

// @route   GET /api/loans/summary
// @desc    Get summary of loans and debts
// @access  Private
router.get('/summary/stats', loanController.getSummary);

module.exports = router;
