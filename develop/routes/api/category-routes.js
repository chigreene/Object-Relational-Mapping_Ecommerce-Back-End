const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({
      include: Product,
    })
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(500).json({ error: 'Internal server error', details: err})
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newData = await Category.create(req.body);
    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [newData] = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (newData === 0) {
      return res.status(404).json({ error: "category not found" });
    }

    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCategory === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

module.exports = router;
