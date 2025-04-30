const userController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

// routes with different methods
//
// create user
router.post("/", userController.createUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
