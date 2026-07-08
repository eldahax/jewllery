const express = require("express");
const router = express.Router();

const employeeController = require("../Controllers/employeeController");


router.post("/", employeeController.create);

router.get("/", employeeController.getAll);

router.get("/:id", employeeController.findEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);


module.exports = router;