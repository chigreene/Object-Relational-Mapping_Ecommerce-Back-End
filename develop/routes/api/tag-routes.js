const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product }, 
        // {model: ProductTag}
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error", details: err });
    
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [newData] = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (newData === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    res.status(200).json(newData);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deletedTag === 0) {
      return res.status(404).json({ error: "tag not found" });
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

module.exports = router;
