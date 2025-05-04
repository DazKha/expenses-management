const db = require('../database/db');

const categoryController = {
  getAll: (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    });
  }
};

module.exports = categoryController;
