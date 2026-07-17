const express = require("express");
const router = express.Router();

const favoriteController = require("../Controllers/FavoriteController");

const { protect, authorize } = require("../Auth/middlewear")

router.post("/", protect, favoriteController.create);

router.get("/", protect, favoriteController.getAll);

router.get("/:id", protect, favoriteController.findByPk);
router.post("/toggle", protect, favoriteController.toggle);
router.delete("/:id", protect, favoriteController.deleteC);

module.exports = router;