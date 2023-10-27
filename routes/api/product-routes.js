const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Creates a product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tagId) => ({
        product_id: product.id,
        tag_id: tagId,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update Product ID
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    const currentTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const currentTagIds = currentTags.map(({ tag_id }) => tag_id);
    const newTagIds = req.body.tagIds || [];

    const tagsToRemove = currentTags.filter(({ tag_id }) => !newTagIds.includes(tag_id));
    const tagsToAdd = newTagIds.filter((tagId) => !currentTagIds.includes(tagId));

    await Promise.all([
      ProductTag.destroy({ where: { id: tagsToRemove.map(({ id }) => id) } }),
      ProductTag.bulkCreate(
        tagsToAdd.map((tagId) => ({
          product_id: req.params.id,
          tag_id: tagId,
        }))
      ),
    ]);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({ where: { id: req.params.id } });

    if (deletedProduct === 0) {
      res.status(404).json({ message: 'Product not in stock' });
    } else {
      res.status(200).json({ message: 'Product deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
