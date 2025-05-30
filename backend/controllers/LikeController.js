const models = require("../models");

const likePost = async (req, res) => {
  const { userid, postid } = req.body;

  try {
    const existing = await models.Likes.findOne({ where: { userid, postid } });
    if (existing) {
      return res.status(400).json({ result: false, message: "already liked" });
    }
    if (!userid) {
      return res.status(401).json({ message: "login required" });
    }

    await models.Likes.create({ userid, postid });
    res.status(201).json({ result: true, message: "post liked" });
  } catch (error) {
    res.status(500).json({ result: false, message: "server error", error });
  }
};

const unlikePost = async (req, res) => {
  const { userid, postid } = req.body;

  if (!userid) {
    return res.status(401).json({ message: "login required" });
  }

  try {
    const deleted = await models.Likes.destroy({ where: { userid, postid } });
    if (!deleted) {
      return res.status(404).json({ result: false, message: "like not found" });
    }

    res.json({ result: true, message: "post unliked" });
  } catch (error) {
    res.status(500).json({ result: false, message: "server error", error });
  }
};

const getLikeCounts = async (req, res) => {
  const { postid } = req.params;

  try {
    const counts = await models.Likes.count({ where: { postid } });

    // console.log("backend like counts", counts);
    res.json({ data: { result: true, message: "counts", counts } });
  } catch (error) {
    res.status(500).json({ result: false, message: "server error", error });
  }
};

const checkLiked = async (req, res) => {
  // console.log("Full req.query:", req.query);
  const { userid, postid } = req.query;
  // console.log("userid:", userid, "postid:", postid);

  if (!userid) {
    // No user logged in, so "liked" is always false for anonymous user
    return res.json({ data: { liked: false } });
  }

  try {
    const liked = await models.Likes.findOne({ where: { userid, postid } });
    res.json({ data: { liked: !!liked } });
  } catch (error) {
    res.status(500).json({ result: false, message: "server error", error });
  }
};

module.exports = { likePost, unlikePost, getLikeCounts, checkLiked };
