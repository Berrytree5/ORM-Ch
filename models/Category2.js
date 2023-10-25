const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your Sequelize instance
const Product = require('./Product'); // Import the Product model

const Category = sequelize.define('Category2', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Defines the association to Product 
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

module.exports = Category;
