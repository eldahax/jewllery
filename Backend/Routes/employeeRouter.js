const express = require("express");
const router = express.Router();

const employeeController = require("../Controllers/employeeController");

const{protect,authorize}=require("../Auth/middlewear")

router.post("/",protect,authorize("admin"), employeeController.create);

router.get("/", protect,authorize("admin"),employeeController.getAll);

router.get("/:id",protect,authorize("admin") ,employeeController.findEmployeeById);
router.put("/:id",protect,authorize("admin") , employeeController.updateEmployee);
router.delete("/:id",protect,authorize("admin") , employeeController.deleteEmployee);


module.exports = router;