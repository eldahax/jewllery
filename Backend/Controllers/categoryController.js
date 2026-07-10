const categoryService=require("../Services/CategoriesService");

const create=async(req,res)=>{
    try{
      const{category_name,description}=req.body;
      const cr=await categoryService.createCategory(category_name,description);
      res.json(cr);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const getAll=async(req,res)=>{
    try{
      const get=await categoryService.getAllCategories();
      res.json(get);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const deleteC=async(req,res)=>{
    try{
      const del =await categoryService.deleteCategory(req.params.id);
      res.json(del);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const findByPk=async(req,res)=>{
    try{
     const pk=await categoryService.findById(req.params.id);
     res.json(pk);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const update=async(req,res)=>{
    try{
    const up=await categoryService.updateCategory(req.params.id,req.body);
    res.json(up);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

module.exports={
    create,
    getAll,
    deleteC,
    findByPk,
    update
}