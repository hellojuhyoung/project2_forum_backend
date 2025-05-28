const models = require("../models");

const { resizeImage, saveBase64Image } = require("../utils/imageProcess");
const path = require("path");
const fs = require("fs");

// function to create posts with its title, content, thumbnail, contentImage
async function createPost(req, res) {
  try {
    // const { title, content, thumbnail, contentImage, userid, categoryid } =
    const { title, content, userid, categoryid, images } = req.body;
    // console.log("this is req.body", req.body);
    // console.log("this is userid", req.body.userid);

    let thumbnailPath = null;

    // if image exists handle with PostImages model and save onto
    // the PostImages table with the post.id
    let postImagesData = [];

    if (images && images.length > 0) {
      // Save thumbnail from the first image
      const thumbnailResult = await saveBase64Image(images[0], true);
      thumbnailPath = thumbnailResult.publicPath;

      // Save all images
      const savedImages = await Promise.all(
        images.map((img) => saveBase64Image(img, false))
      );

      postImagesData = savedImages.map((img) => ({
        postImage: img.publicPath,
      }));
    }

    // the name of the table is set to "Posts" to call the table
    // migration/model/mysql all their names have to match
    const post = await models.Posts.create({
      title: title,
      content: content,
      thumbnail: thumbnailPath, // save the thumbnail path
      userid: userid,
      categoryid: categoryid,
    });

    if (postImagesData.length > 0) {
      postImagesData.forEach((img) => (img.postid = post.id));
      await models.PostImages.bulkCreate(postImagesData);
    }

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
    // console.log("this is delete body", req.body);
    // console.log("this is delete params", req.params);
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
    const { title, content, userid, categoryid, images } = req.body;
    const { id } = req.params;

    let thumbnailPath = null;
    let postImagesData = [];

    // Check if images exist or is an empty array
    if (images) {
      // 1. Get existing images from DB
      const existingImages = await models.PostImages.findAll({
        where: { postid: id },
      });

      // 2. Delete files from disk
      for (const img of existingImages) {
        const imgPath = path.join(__dirname, "..", img.postImage);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }

      // 3. Delete from DB
      await models.PostImages.destroy({ where: { postid: id } });

      if (images.length > 0) {
        // 4. Save new thumbnail from first image
        const thumbnailResult = await saveBase64Image(images[0], true);
        thumbnailPath = thumbnailResult.publicPath;

        // 5. Save new images to disk
        const savedImages = await Promise.all(
          images.map((img) => saveBase64Image(img, false))
        );

        postImagesData = savedImages.map((img) => ({
          postImage: img.publicPath,
          postid: id,
        }));

        // 6. Insert new post images into DB
        await models.PostImages.bulkCreate(postImagesData);
      } else {
        // No images, so clear thumbnail path
        thumbnailPath = null;
      }
    }

    // 7. Update the post itself
    await models.Posts.update(
      {
        title,
        content,
        thumbnail: thumbnailPath,
        userid,
        categoryid,
      },
      { where: { id } }
    );

    res.json({ result: true, message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ result: false, error: "Error updating post" });
  }
}

// get a single post
async function getPost(req, res) {
  try {
    const id = req.params.id;
    const response = await models.Posts.findOne({
      where: { id: id },
      include: [
        {
          model: models.PostImages,
          as: "images",
          attributes: ["postImage"],
        },
        {
          model: models.Categories,
          as: "category",
          attributes: ["label"],
        },
        {
          model: models.Users,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    // const post = response.dataValues;
    const post = response.toJSON();

    // console.log("response", response.dataValues);
    // console.log("backend", post);
    // console.log(response);
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
      include: [
        {
          model: models.Users,
          as: "user",
          attributes: ["username"],
        },
      ],
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
      include: [
        {
          model: models.Users,
          as: "user",
          attributes: ["username"],
        },
      ],
    });

    const posts = rows.map((post) => ({
      ...post.dataValues,
      username: post.user?.username,
      category: post.category?.label,
    }));
    const totalPages = Math.ceil(count / limit);

    console.log("this is backend", posts);

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
