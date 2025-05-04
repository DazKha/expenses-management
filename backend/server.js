const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/auth');
const transactionRoutes = require('./src/routes/transactions');
const budgetRoutes = require('./src/routes/budgets');
const savingRoutes = require('./src/routes/savings');
const loanRoutes = require('./src/routes/loans');
const categoryRoutes = require('./src/routes/categories');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up uploads directory for receipts
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/savings', savingRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/categories', categoryRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Expense Tracker API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
