const Budget = require('../models/budget');

const budgetController = {
  // Get all budgets
  getAll: async (req, res) => {
    try {
      const budgets = await Budget.getAll(req.user.id);
      res.json(budgets);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Get a single budget
  getById: async (req, res) => {
    try {
      const budget = await Budget.getById(req.params.id, req.user.id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Create a new budget
  create: async (req, res) => {
    try {
      const { month, amount } = req.body;
      
      const budget = await Budget.create({
        user_id: req.user.id,
        month,
        amount
      });
      
      res.status(201).json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Update a budget
  update: async (req, res) => {
    try {
      const { month, amount } = req.body;
      
      const budget = await Budget.update(
        req.params.id,
        { month, amount },
        req.user.id
      );
      
      res.json(budget);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Delete a budget
  delete: async (req, res) => {
    try {
      await Budget.delete(req.params.id, req.user.id);
      res.json({ message: 'Budget deleted' });
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Get current month budget status
  getCurrentMonthStatus: async (req, res) => {
    try {
      const status = await Budget.getCurrentMonthStatus(req.user.id);
      res.json(status);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
};

module.exports = budgetController;
