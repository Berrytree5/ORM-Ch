const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'melody',
  },
  {
    tag_name: 'rap',
  },
  {
    tag_name: 'ocean',
  },
  {
    tag_name: 'water',
  },
  {
    tag_name: 'area',
  },
  {
    tag_name: 'bay',
  },
  {
    tag_name: 'cali',
  },
  {
    tag_name: 'alcohol',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;