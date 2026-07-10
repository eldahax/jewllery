const express = require("express");
const router = express.Router();

const categoriessController = require("../Controllers/categoryController");

const{protect,authorize}=require("../Auth/middlewear")
router.post("/",protect,authorize("admin","employee"),categoriessController.create);

router.get("/",protect,authorize("admin","employee"), categoriessController.getAll);

router.get("/:id",protect,authorize("admin") ,categoriessController.findByPk);
router.put("/:id",protect,authorize("admin") , categoriessController.update);
router.delete("/:id",protect,authorize("admin") , categoriessController.deleteC);


module.exports = router;