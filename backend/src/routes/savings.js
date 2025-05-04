const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');
const authMiddleware = require('../middlewares/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/savings
// @desc    Get all savings
// @access  Private
router.get('/', savingController.getAll);

// @route   GET /api/savings/:id
// @desc    Get saving by ID
// @access  Private
router.get('/:id', savingController.getById);

// @route   POST /api/savings
// @desc    Create a new saving
// @access  Private
router.post('/', savingController.create);

// @route   PUT /api/savings/:id
// @desc    Update a saving
// @access  Private
router.put('/:id', savingController.update);

// @route   DELETE /api/savings/:id
// @desc    Delete a saving
// @access  Private
router.delete('/:id', savingController.delete);

// @route   POST /api/savings/:id/add
// @desc    Add amount to a saving goal
// @access  Private
router.post('/:id/add', savingController.addAmount);

module.exports = router;
