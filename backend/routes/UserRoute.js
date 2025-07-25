// mounted router with /users/...

const userController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

// routes with different methods
//
// validate username
router.get("/validate-username", userController.validateUsername);
//  get user
router.get("/:id", userController.getUser);
// get all the posts by user
router.get("/getPosts/:id", userController.getUserPosts);

// update user
router.put("/update/:id", userController.updateUser);

// create user
router.post("/signup", userController.createUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
