const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const CategoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.json(Category);
  }catch (err){
    res.status(500).json(err);
  };
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
    // be sure to include its associated Products
  try{
    const CategoryData = await Category.findByPk(req.params.id,{
      include:[Product],
  })
  if(!CategoryData){
    res.status(404).json({message:'No such category found'});
    return;
  }
  if(!catergoryData){
    res.status(201).json({'category': catergoryData});
    return;
  }
  res.status(200).json(catergoryData);
}catch (err){
  res.status(500).json(err);
}
});

router.post('/', async(req, res) => {
  // create a new category
  try{ 
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    res.json(category)
  })
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategoy=await Category.destroy ({
      where:{
        id :req.params.id
      },
    });
    if(!deletedCategoy) {
      res.status(404).json({message: 'No such category found'});
    }else{
      res.status(200).json({message: 'Category deleted successfully'});
    }
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
