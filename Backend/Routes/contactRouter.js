const express = require("express");
const router = express.Router();

const contactController = require("../Controllers/contactController");
const { protect, authorize } = require("../Auth/middlewear")

router.post("/", contactController.add);
router.get("/", protect, authorize("admin","costumer"), contactController.getAllContacts);
router.get("/:id", protect, authorize("admin"), contactController.getContactById);
router.delete("/:id", protect, authorize("admin"), contactController.deleteContact);

module.exports = router