const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
// Define the Category2 model
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

module.exports = Category2;
