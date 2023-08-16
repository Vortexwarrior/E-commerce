const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findall({
      include: [{model: Product}],
    });
    res.json(tag);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    res.status(200).json(tagId);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag.
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData)
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagNew = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagNew)
    res.status(404).json({message: 'No tag found with this id'});
    return;
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag=await Tag.destroy({
      where:{
        id : req.params.id
      }
    });
    if(!deleteTag){
      res.status(404).json({message: 'No tag found with this id'});
    }else{
      res.status(200).json({message: "Tag was deleted successfully"});
    }
  }catch(err){
      res.status(500).json(err);
    }
});

module.exports = router;
