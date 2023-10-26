const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Style',
  },
  {
    category_name: 'Sweats',
  },
  {
    category_name: 'Squads',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Food',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;