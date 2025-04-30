// mounted router with /posts/...

const postController = require("../controllers/PostController");
const express = require("express");
const router = express.Router();

// routes with different methods
//
// get post
router.get("/:id", postController.getPost);

// create post
router.post("/", postController.createPost);

// update post
router.put("/update/:id", postController.updatePost);

// delete post
router.delete("/:id", postController.deletePost);

module.exports = router;
