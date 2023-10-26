const { Sequelize } = require('sequelize');

// Initialize a new Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  username: 'root',
  password: '3431drew',
  database: 'ecommerce_db',
});

module.exports = sequelize;
