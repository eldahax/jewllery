const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../Auth/middlewear");
const userController = require("../Controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/logout", userController.logout); 
router.post("/refresh", userController.refresh); 

router.get("/me", protect, userController.getMe); 


router.get("/", protect, authorize("admin"), userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;