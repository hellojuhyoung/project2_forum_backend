const models = require("../models");

// function to create posts with its title, content, thumbnail, contentImage
async function createPost(req, res) {
  try {
    // const { title, content, thumbnail, contentImage, userid, categoryid } =
    const { title, userid, categoryid } = req.body;
    console.log("this is req.body", req.body);
    console.log("this is uerid", req.body.userid);
    // the name of the table is set to "Posts" to call the table
    // migration/model/mysql all their names have to match
    await models.Posts.create({
      title: title,
      // content: content,
      // thumbnail: thumbnail,
      // contentImage: contentImage,
      userid: userid,
      categoryid: categoryid,
    });

    // must require response, or else it's in infinite loop
    res.json({ result: true, message: "succeeded in creating post" });
  } catch (error) {
    console.log(error);
    console.error("error creating post");
    res.status(500).json({ result: false, error: "error creating post" });
  }
}

// function to take 'id' value to delete the post (integer)
async function deletePost(req, res) {
  try {
    // req.params is identified as what's in the url
    // req.body is referred to JSON body usually in {object}
    console.log("this is delete body", req.body);
    console.log("this is delete params", req.params);
    // req.body contains all the columns from the mysql table
    // would have to specify the variable such as id
    // the req.body data is in object form
    const id = req.params.id;
    await models.Posts.destroy({ where: { id: id } });

    res.json({ result: true, message: "succeeded in deleting post" });
  } catch (error) {
    console.log(error);
    console.error("error deleting post");
    res.status(500).json({ result: false, error: "error deleting post" });
  }
}

// function to update post by 'id' (integer)
async function updatePost(req, res) {
  try {
    // since the 'id' value is also part of req.body
    // would need to separately declare variables from req.body
    const bodyTitle = req.body.data.title;
    const bodyContent = req.body.data.content;
    const bodyThumbnail = req.body.data.thumbnail;
    const bodyContentImage = req.body.data.contentImage;
    // then group all the variables that's part of the post
    // into an object called 'update'
    const update = {
      title: bodyTitle,
      content: bodyContent,
      thumbnail: bodyThumbnail,
      contentImage: bodyContentImage,
    };
    const id = req.body.data.id;
    // const id = req.params.id;
    console.log("this is update body", req.body);
    console.log("this is title", req.body.data.title);
    console.log("this is update params", req.params);

    await models.Posts.update(update, { where: { id: id } });

    res.json({ update, result: true, message: "succeeded in updating post" });
  } catch (error) {
    console.log(error);
    console.error("error in updating post");
    res.status(500).json({ result: false, error: "error updating post" });
  }
}

// get a single post
async function getPost(req, res) {
  try {
    const id = req.params.id;
    const response = await models.Posts.findOne({ where: { id: id } });
    const post = response.dataValues;
    // console.log("response", response.dataValues);
    // console.log("backend", post);

    res.json({ post, result: true, message: "succeeded in getting post" });
  } catch (error) {
    console.log(error);
    console.error("error in getting post");
    res.status(500).json({ result: false, error: "error getting post" });
  }
}

// get top 8 most recent posts
const getRecentPosts = async (req, res) => {
  try {
    const limit = 8;

    const posts = await models.Posts.findAll({
      limit,
      order: [["createdAt", "DESC"]],
    });

    // console.log(posts);

    res.json({
      posts,
      result: true,
      message: "succeeded in getting most recent posts",
    });
  } catch (error) {
    console.error("error fetching most recent posts", error);
  }
};

// get all posts in pagination style
const getPaginatedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 16;
    const offset = (page - 1) * limit;

    const { count, rows } = await models.Posts.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    const posts = rows.map((post) => post.dataValues);
    const totalPages = Math.ceil(count / limit);

    res.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts: count,
      result: true,
      message: "Succeeded in getting paginated posts",
    });
  } catch (error) {
    console.error("Error in fetching paginated posts:", error);
    res.status(500).json({
      result: false,
      message: "Failed to fetch posts",
    });
  }
};
//

// exports all the functions as module
module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getRecentPosts,
  getPaginatedPosts,
};
