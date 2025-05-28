const likeController = require("../controllers/LikeController");

const express = require("express");
const router = express.Router();

// get likes
router.get("/count/:postid", likeController.getLikeCounts);
router.get("/check", likeController.checkLiked);

// post likes
router.post("/", likeController.likePost);

// delete likes
router.delete("/", likeController.unlikePost);

module.exports = router;
