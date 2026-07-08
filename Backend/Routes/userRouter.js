const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.findUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


module.exports = router;