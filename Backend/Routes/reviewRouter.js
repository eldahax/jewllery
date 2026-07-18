const express=require("express");
const router=express.Router();

const revController = require("../Controllers/reviewsController");

const{protect,authorize}=require("../Auth/middlewear")

router.post("/", revController.create);

router.get("/", protect,authorize("admin","costumer"),revController.getAll);

router.get("/:id",protect,authorize("admin") ,revController.getByProduct);

router.delete("/:id",protect,authorize("admin") ,revController.deleteR)
module.exports = router;