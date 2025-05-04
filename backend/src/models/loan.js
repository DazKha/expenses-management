const db = require('../database/db');

const Loan = {
  // Get all loans/debts for a user
  getAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM loans_debts WHERE user_id = ? ORDER BY due_date ASC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },

  // Get a single loan/debt
  getById: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM loans_debts WHERE id = ? AND user_id = ?`,
        [id, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  },

  // Create a new loan/debt
  create: (loan) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO loans_debts 
         (user_id, amount, person, due_date, type, status) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          loan.user_id,
          loan.amount,
          loan.person,
          loan.due_date,
          loan.type,
          loan.status || 'pending'
        ],
        function(err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...loan });
        }
      );
    });
  },

  // Update a loan/debt
  update: (id, loan, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE loans_debts 
         SET amount = ?, person = ?, due_date = ?, type = ?, status = ?
         WHERE id = ? AND user_id = ?`,
        [
          loan.amount,
          loan.person,
          loan.due_date,
          loan.type,
          loan.status,
          id,
          userId
        ],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Loan/debt not found or not authorized'));
          }
          resolve({ id, ...loan });
        }
      );
    });
  },

  // Delete a loan/debt
  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM loans_debts WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Loan/debt not found or not authorized'));
          }
          resolve({ id });
        }
      );
    });
  },

  // Mark a loan/debt as paid
  markAsPaid: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE loans_debts SET status = 'paid' WHERE id = ? AND user_id = ?`,
        [id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Loan/debt not found or not authorized'));
          }
          
          // Get the updated loan/debt
          db.get(
            `SELECT * FROM loans_debts WHERE id = ?`,
            [id],
            (err, row) => {
              if (err) return reject(err);
              resolve(row);
            }
          );
        }
      );
    });
  },

  // Get summary of loans and debts
  getSummary: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          SUM(CASE WHEN type = 'loan' AND status = 'pending' THEN amount ELSE 0 END) as total_loans,
          SUM(CASE WHEN type = 'debt' AND status = 'pending' THEN amount ELSE 0 END) as total_debts
         FROM loans_debts
         WHERE user_id = ?`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  }
};

module.exports = Loan;
