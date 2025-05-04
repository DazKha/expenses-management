const Saving = require('../models/saving');

const savingController = {
  // Get all savings
  getAll: async (req, res) => {
    try {
      const savings = await Saving.getAll(req.user.id);
      res.json(savings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Get a single saving
  getById: async (req, res) => {
    try {
      const saving = await Saving.getById(req.params.id, req.user.id);
      if (!saving) {
        return res.status(404).json({ message: 'Saving goal not found' });
      }
      res.json(saving);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Create a new saving
  create: async (req, res) => {
    try {
      const { goal_name, target_amount, current_amount } = req.body;
      
      const saving = await Saving.create({
        user_id: req.user.id,
        goal_name,
        target_amount,
        current_amount
      });
      
      res.status(201).json(saving);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Update a saving
  update: async (req, res) => {
    try {
      const { goal_name, target_amount, current_amount } = req.body;
      
      const saving = await Saving.update(
        req.params.id,
        { goal_name, target_amount, current_amount },
        req.user.id
      );
      
      res.json(saving);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Delete a saving
  delete: async (req, res) => {
    try {
      await Saving.delete(req.params.id, req.user.id);
      res.json({ message: 'Saving goal deleted' });
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  },
  
  // Add amount to a saving goal
  addAmount: async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Valid amount is required' });
      }
      
      const saving = await Saving.addAmount(req.params.id, amount, req.user.id);
      res.json(saving);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('not found or not authorized')) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send('Server error');
    }
  }
};

module.exports = savingController;
