const db = require('../database/db');

const Budget = {
  // Get all budgets for a user
  getAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT b.*, 
         (SELECT SUM(amount) FROM transactions 
          WHERE user_id = b.user_id 
          AND type = 'expense' 
          AND strftime('%Y-%m', date) = b.month) as spent
         FROM budgets b
         WHERE b.user_id = ?
         ORDER BY b.month DESC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },

  // Get a single budget
  getById: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT b.*, 
         (SELECT SUM(amount) FROM transactions 
          WHERE user_id = b.user_id 
          AND type = 'expense' 
          AND strftime('%Y-%m', date) = b.month) as spent
         FROM budgets b
         WHERE b.id = ? AND b.user_id = ?`,
        [id, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  },

  // Create a new budget
  create: (budget) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO budgets 
         (user_id, month, amount) 
         VALUES (?, ?, ?)`,
        [
          budget.user_id,
          budget.month,
          budget.amount
        ],
        function(err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...budget });
        }
      );
    });
  },

  // Update a budget
  update: (id, budget, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE budgets 
         SET month = ?, amount = ?
         WHERE id = ? AND user_id = ?`,
        [
          budget.month,
          budget.amount,
          id,
          userId
        ],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Budget not found or not authorized'));
          }
          resolve({ id, ...budget });
        }
      );
    });
  },

  // Delete a budget
  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM budgets WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Budget not found or not authorized'));
          }
          resolve({ id });
        }
      );
    });
  },

  // Get current month budget status
  getCurrentMonthStatus: (userId) => {
    return new Promise((resolve, reject) => {
      const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
      
      db.get(
        `SELECT b.*, 
         (SELECT SUM(amount) FROM transactions 
          WHERE user_id = b.user_id 
          AND type = 'expense' 
          AND strftime('%Y-%m', date) = b.month) as spent
         FROM budgets b
         WHERE b.user_id = ? AND b.month = ?`,
        [userId, currentMonth],
        (err, row) => {
          if (err) return reject(err);
          resolve(row || { month: currentMonth, amount: 0, spent: 0 });
        }
      );
    });
  }
};

module.exports = Budget;
