const Loan = require('../models/loan');

const loanController = {
  // Get all loans/debts
  getAll: async (req, res) => {
    try {
      const loans = await Loan.getAll(req.user.id);
      res.json(loans);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Get a single loan/debt
  getById: async (req, res) => {
    try {
      const loan = await Loan.getById(req.params.id, req.user.id);
      if (!loan) {
        return res.status(404).json({ message: 'Loan/debt not found' });
      }
      res.json(loan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Create a new loan/debt
  create: async (req, res) => {
    try {
      const { amount, person, due_date, type, status } = req.body;
      
      const loan = await Loan.create({
        user_id: req.user.id,
        amount,
        person,
        due_date,
        type,
        status
      });
      
      res.status(201).json(loan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Update a loan/debt
  update: async (req, res) => {
    try {
      const { amount, person, due_date, type, status } = req.body;
      
      const loan = await Loan.update(
        req.params.id,
        { amount, person, due_date, type, status },
        req.user.id
      );
      
      res.json(loan);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Delete a loan/debt
  delete: async (req, res) => {
    try {
      await Loan.delete(req.params.id, req.user.id);
      res.json({ message: 'Loan/debt deleted' });
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Mark a loan/debt as paid
  markAsPaid: async (req, res) => {
    try {
      const loan = await Loan.markAsPaid(req.params.id, req.user.id);
      res.json(loan);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Get summary of loans and debts
  getSummary: async (req, res) => {
    try {
      const summary = await Loan.getSummary(req.user.id);
      res.json(summary);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
};

module.exports = loanController;
