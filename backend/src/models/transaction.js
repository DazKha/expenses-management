const db = require('../database/db');

const Transaction = {
  // Get all transactions for a user
  getAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT t.*, c.name as category_name 
         FROM transactions t
         JOIN categories c ON t.category_id = c.id
         WHERE t.user_id = ?
         ORDER BY t.date DESC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },

  // Get a single transaction
  getById: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT t.*, c.name as category_name 
         FROM transactions t
         JOIN categories c ON t.category_id = c.id
         WHERE t.id = ? AND t.user_id = ?`,
        [id, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  },

  // Create a new transaction
  create: (transaction) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transactions 
         (user_id, amount, date, category_id, note, type) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          transaction.user_id,
          transaction.amount,
          transaction.date,
          transaction.category_id,
          transaction.note,
          transaction.type
        ],
        function(err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...transaction });
        }
      );
    });
  },

  // Update a transaction
  update: (id, transaction, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE transactions 
         SET amount = ?, date = ?, category_id = ?, note = ?, type = ?
         WHERE id = ? AND user_id = ?`,
        [
          transaction.amount,
          transaction.date,
          transaction.category_id,
          transaction.note,
          transaction.type,
          id,
          userId
        ],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Transaction not found or not authorized'));
          }
          resolve({ id, ...transaction });
        }
      );
    });
  },

  // Delete a transaction
  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM transactions WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Transaction not found or not authorized'));
          }
          resolve({ id });
        }
      );
    });
  },

  // Get summary statistics
  getSummary: (userId, period) => {
    return new Promise((resolve, reject) => {
      let dateFilter = '';
      
      if (period === 'week') {
        dateFilter = "AND date(date) >= date('now', '-7 days')";
      } else if (period === 'month') {
        dateFilter = "AND date(date) >= date('now', '-1 month')";
      } else if (period === 'year') {
        dateFilter = "AND date(date) >= date('now', '-1 year')";
      }
      
      db.all(
        `SELECT 
          SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
          SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
          (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
           SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) as balance
         FROM transactions
         WHERE user_id = ? ${dateFilter}`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  }
};

module.exports = Transaction;
