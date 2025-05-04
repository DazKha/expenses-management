const db = require('../database/db');
const bcrypt = require('bcryptjs');

const User = {
  // Create a new user
  create: async (userData) => {
    return new Promise((resolve, reject) => {
      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        
        bcrypt.hash(userData.password, salt, (err, hash) => {
          if (err) return reject(err);
          
          // Replace plain password with hashed password
          const user = {
            name: userData.name,
            email: userData.email,
            password: hash
          };
          
          // Insert user into database
          db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password],
            function(err) {
              if (err) return reject(err);
              resolve({ id: this.lastID, ...user, password: undefined });
            }
          );
        });
      });
    });
  },
  
  // Find user by email
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  },
  
  // Find user by ID
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id, name, email FROM users WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  }
};

module.exports = User;
