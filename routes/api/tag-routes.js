const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    if (updatedRows === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json({ message: 'Tag updated successfully' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json({ message: 'Tag deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
