const express = require("express");
const router = express.Router();
const multer = require("multer"); // 1. Import multer
const upload = multer({ dest: "uploads/" }); // 2. Set upload destination

const productController = require("../Controllers/productController");
const { protect, authorize } = require("../Auth/middlewear");

router.post("/", protect, authorize("admin"), upload.single("image"), productController.create);
router.get("/", protect, productController.getAll);
router.get("/:id", protect, authorize("admin"), productController.findByPk);
router.put("/:id", protect, authorize("admin"), upload.single("image"), productController.update);
router.delete("/:id", protect, authorize("admin"), productController.deleteP);

module.exports = router;