const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");
const { protect } = require("../Auth/middlewear");

router.use(protect);

router.post("/", reminderController.create);
router.get("/", reminderController.getAll);
router.get("/:id", reminderController.getById);
router.put("/:id", reminderController.update);
router.delete("/:id", reminderController.remove);
router.patch("/:id/sent", reminderController.markAsSent);

module.exports = router;