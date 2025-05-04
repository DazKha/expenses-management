const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create new user
      const user = await User.create({ name, email, password });
      
      // Create JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Create JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  // Get user data
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
};

module.exports = authController;
