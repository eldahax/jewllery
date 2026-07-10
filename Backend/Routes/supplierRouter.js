const express = require("express");
const router = express.Router();

const supplierController = require("../Controllers/supplierController");


router.post("/", supplierController.create);

router.get("/", supplierController.getAll);

router.get("/:id", supplierController.findByPk);
router.put("/:id", supplierController.update);
router.delete("/:id", supplierController.deleteS);


module.exports = router;