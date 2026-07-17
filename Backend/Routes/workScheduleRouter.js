const express = require("express");
const router = express.Router();

const workController = require("../Controllers/workScheduleController");

const{protect,authorize}=require("../Auth/middlewear")

router.post("/",protect,authorize("admin"), workController.createWork);

router.get("/", protect,authorize("admin","employee"),workController.getAllWork);

router.get("/:id",protect,authorize("admin") ,workController.getById);
router.put("/:id",protect,authorize("admin") , workController.update);
router.delete("/:id",protect,authorize("admin") , workController.deleteW);


module.exports = router;