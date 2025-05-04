const db = require('../database/db');

const Saving = {
  // Get all savings for a user
  getAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM savings WHERE user_id = ? ORDER BY id DESC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },

  // Get a single saving
  getById: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM savings WHERE id = ? AND user_id = ?`,
        [id, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  },

  // Create a new saving
  create: (saving) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO savings 
         (user_id, goal_name, target_amount, current_amount) 
         VALUES (?, ?, ?, ?)`,
        [
          saving.user_id,
          saving.goal_name,
          saving.target_amount,
          saving.current_amount || 0
        ],
        function(err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...saving });
        }
      );
    });
  },

  // Update a saving
  update: (id, saving, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE savings 
         SET goal_name = ?, target_amount = ?, current_amount = ?
         WHERE id = ? AND user_id = ?`,
        [
          saving.goal_name,
          saving.target_amount,
          saving.current_amount,
          id,
          userId
        ],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Saving goal not found or not authorized'));
          }
          resolve({ id, ...saving });
        }
      );
    });
  },

  // Delete a saving
  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM savings WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Saving goal not found or not authorized'));
          }
          resolve({ id });
        }
      );
    });
  },

  // Add amount to a saving goal
  addAmount: (id, amount, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE savings 
         SET current_amount = current_amount + ?
         WHERE id = ? AND user_id = ?`,
        [amount, id, userId],
        function(err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error('Saving goal not found or not authorized'));
          }
          
          // Get the updated saving
          db.get(
            `SELECT * FROM savings WHERE id = ?`,
            [id],
            (err, row) => {
              if (err) return reject(err);
              resolve(row);
            }
          );
        }
      );
    });
  }
};

module.exports = Saving;
