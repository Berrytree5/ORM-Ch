const { Model, DataTypes } = require('sequelize'); // Imports model
const sequelize = require('../config/connection'); // Imports sequelize
const Product = require('./Product'); // Imports the Product model

class Category2 extends Model {}
 


Category2.init(
  {
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Category2',
  }
);

// Defines the association to Product
Category2.hasMany(Product, {
  foreignKey: 'category_id',
});

module.exports = Category2;
