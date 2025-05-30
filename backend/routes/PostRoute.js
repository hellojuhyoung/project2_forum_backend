// mounted router with /posts/...

const postController = require("../controllers/PostController");
const express = require("express");
const router = express.Router();

// routes with different methods
//
// get post
// *** always put more specific (static) routes like /recent
// *** before dynamic ones like /:id
router.get("/recent", postController.getRecentPosts);
router.get("/mostLiked", postController.getMostLikedPosts);
router.get("/", postController.getPaginatedPosts);
router.get("/:id", postController.getPost);

// create post
router.post("/create", postController.createPost);

// update post
router.put("/update/:id", postController.updatePost);

// delete post
router.delete("/:id", postController.deletePost);

module.exports = router;
