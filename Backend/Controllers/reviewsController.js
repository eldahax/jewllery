const reviewService=require("../Services/ReviewService");


const create=async(req,res)=>{
    try{
      const {product_id,stars,notes}=req.body;
      const cr=await reviewService.createReview(product_id,stars,notes);
      res.json(cr)
    }
  catch(err){
    res.status(500).json({error:err.message});
}
}

const getAll=async(req,res)=>{
    try{
       const all=await reviewService.getAllReviews();
       res.json(all);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const getByProduct=async(req,res)=>{
    try{
      const{id}=req.body
      const byId=await reviewService.getById(id);
      res.json(byId);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const deleteR=async(req,res)=>{
    try{
     const del=await reviewService.deleteS(req.params.id);
     res.json(del)
    }
    catch(err){
                res.status(500).json({error:err.message})

    }
}
module.exports={
    create,
    getAll,
    getByProduct,
    deleteR
}