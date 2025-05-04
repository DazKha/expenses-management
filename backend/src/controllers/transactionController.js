const Transaction = require('../models/transaction');

const transactionController = {
  // Get all transactions
  getAll: async (req, res) => {
    try {
      const transactions = await Transaction.getAll(req.user.id);
      res.json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Get a single transaction
  getById: async (req, res) => {
    try {
      const transaction = await Transaction.getById(req.params.id, req.user.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Create a new transaction
  create: async (req, res) => {
    try {
      const { amount, date, category_id, note, type } = req.body;
      
      const transaction = await Transaction.create({
        user_id: req.user.id,
        amount,
        date,
        category_id,
        note,
        type
      });
      
      res.status(201).json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Update a transaction
  update: async (req, res) => {
    try {
      const { amount, date, category_id, note, type } = req.body;
      
      const transaction = await Transaction.update(
        req.params.id,
        { amount, date, category_id, note, type },
        req.user.id
      );
      
      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Delete a transaction
  delete: async (req, res) => {
    try {
      await Transaction.delete(req.params.id, req.user.id);
      res.json({ message: 'Transaction deleted' });
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Get transaction summary
  getSummary: async (req, res) => {
    try {
      const period = req.query.period || 'month'; // Default to monthly summary
      const summary = await Transaction.getSummary(req.user.id, period);
      res.json(summary);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
};

module.exports = transactionController;
