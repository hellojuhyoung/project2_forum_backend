// backend/controllers/PostController.js
const models = require("../models");

const {
  resizeImage,
  saveBase64Image,
  saveImageUrl,
} = require("../utils/imageProcess");
const path = require("path");
const fs = require("fs");

// Helper function to extract the first image URL from Markdown content
function extractImageUrlFromMarkdown(markdownContent) {
  const imageRegex =
    /!\[.*?\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|gif|webp|svg))\)/;
  const match = markdownContent.match(imageRegex);
  return match ? match[1] : null;
}

// function to create posts with its title, content, thumbnail, contentImage
async function createPost(req, res) {
  try {
    const { title, content, userid, categoryid, images } = req.body;
    let thumbnailPath = null;
    let postImagesData = [];

    const imageUrlFromContent = extractImageUrlFromMarkdown(content);

    // ✨ MODIFIED LOGIC: Handle external URL image for thumbnail
    if (imageUrlFromContent) {
      try {
        // Fetch the external image, process it, and save a local thumbnail
        const thumbnailResult = await saveImageUrl(imageUrlFromContent, true);
        thumbnailPath = thumbnailResult.publicPath;
      } catch (urlProcessError) {
        console.warn(
          `Could not process URL image for thumbnail: ${imageUrlFromContent}. Using fallback.`,
          urlProcessError
        );
        thumbnailPath = "/no-image.jpg"; // Fallback if URL processing fails
      }
    }
    // This `else if` block handles images sent as Base64 (typically from local file uploads)
    else if (images && images.length > 0) {
      // Save thumbnail from the first image in the `images` array
      const thumbnailResult = await saveBase64Image(images[0], true);
      thumbnailPath = thumbnailResult.publicPath;

      // Save all content images if applicable
      const savedImages = await Promise.all(
        images.map((img) => saveBase64Image(img, false))
      );
      postImagesData = savedImages.map((img) => ({
        postImage: img.publicPath,
      }));
    } else {
      // If no image (URL or local file) is found in content or `images` array
      thumbnailPath = null; // Or set a default placeholder like "/no-image.jpg"
    }

    console.log(
      `[DEBUG - PostController] Final thumbnailPath for database: ${thumbnailPath}`
    );

    const post = await models.Posts.create({
      title: title,
      content: content,
      thumbnail: thumbnailPath, // Save the determined local thumbnail path
      userid: userid,
      categoryid: categoryid,
    });

    if (postImagesData.length > 0) {
      postImagesData.forEach((img) => (img.postid = post.id));
      await models.PostImages.bulkCreate(postImagesData);
    }

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

    const post = await models.Posts.findOne({
      where: { id: id, userid: userid },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you don't have permission to update.",
      });
    }

    let newThumbnailPath = null;
    let postImagesData = [];

    const imageUrlFromNewContent = extractImageUrlFromMarkdown(content);

    // ✨ MODIFIED LOGIC: Handle external URL image for thumbnail during update
    if (imageUrlFromNewContent) {
      try {
        const thumbnailResult = await saveImageUrl(
          imageUrlFromNewContent,
          true
        );
        newThumbnailPath = thumbnailResult.publicPath;
      } catch (urlProcessError) {
        console.warn(
          `Could not process URL image for thumbnail during update: ${imageUrlFromNewContent}. Using fallback.`,
          urlProcessError
        );
        newThumbnailPath = "/no-image.jpg"; // Fallback if URL processing fails
      }
    }
    // This `else if` block handles images sent as Base64 (local file uploads)
    else if (images) {
      // Check if `images` array was provided (even if empty)
      // Clear existing images from disk and DB first if new images are provided
      const existingImages = await models.PostImages.findAll({
        where: { postid: id },
      });

      for (const img of existingImages) {
        const imgPath = path.join(__dirname, "..", img.postImage);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
      await models.PostImages.destroy({ where: { postid: id } });

      if (images.length > 0) {
        // Save new thumbnail from first image in the provided `images` array
        const thumbnailResult = await saveBase64Image(images[0], true);
        newThumbnailPath = thumbnailResult.publicPath;

        // Save new content images
        const savedImages = await Promise.all(
          images.map((img) => saveBase64Image(img, false))
        );

        postImagesData = savedImages.map((img) => ({
          postImage: img.publicPath,
          postid: id,
        }));

        await models.PostImages.bulkCreate(postImagesData);
      } else {
        newThumbnailPath = null; // If `images` array provided but empty, clear thumbnail
      }
    } else {
      // If no new `images` array, and no new content URL, retain existing thumbnail
      newThumbnailPath = post.thumbnail;
    }

    await post.update(
      {
        title,
        content,
        thumbnail: newThumbnailPath, // Use the determined local thumbnail path
        userid: userid,
        categoryid: categoryid,
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
    const post = response.toJSON();

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

    res.json({
      posts,
      result: true,
      message: "succeeded in getting most recent posts",
    });
  } catch (error) {
    console.error("error fetching most recent posts", error);
  }
};

const getMostLikedPosts = async (req, res) => {
  try {
    const limit = 8;

    const postAttributes = Object.keys(models.Posts.rawAttributes);

    const attributesToSelect = [
      ...postAttributes,
      [
        models.sequelize.fn("COUNT", models.sequelize.col("Likes.id")),
        "likesCount",
      ],
    ];

    const posts = await models.Posts.findAll({
      attributes: attributesToSelect,
      include: [
        {
          model: models.Users,
          as: "user",
          attributes: ["username"],
        },
        {
          model: models.Likes,
          attributes: [],
          duplicating: false,
        },
      ],
      group: [
        "Posts.id",
        ...postAttributes.map((attr) => `Posts.${attr}`),
        "user.id",
      ],
      order: [[models.sequelize.literal("likesCount"), "DESC"]],
      limit: limit,
      subQuery: false,
    });

    res.json({
      posts: posts,
      result: true,
      message: "succeeded in getting most liked posts",
    });
  } catch (error) {
    console.error("error fetching most liked posts:", error);
    res
      .status(500)
      .json({ result: false, message: "server error", error: error.message });
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

// exports all the functions as module
module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getRecentPosts,
  getMostLikedPosts,
  getPaginatedPosts,
};
