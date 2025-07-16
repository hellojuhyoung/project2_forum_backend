// backend/controllers/PostController.js
const models = require("../models");

const { resizeImage, saveBase64Image } = require("../utils/imageProcess");
const path = require("path");
const fs = require("fs");

// Helper function to extract the first image URL from Markdown content
function extractImageUrlFromMarkdown(markdownContent) {
  // Regex to find Markdown image syntax: ![alt text](url)
  // It specifically looks for URLs starting with http:// or https://
  const imageRegex =
    /!\[.*?\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|gif|webp|svg))\)/;
  const match = markdownContent.match(imageRegex);
  return match ? match[1] : null; // Return the URL part (group 1) or null if no match
}

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

    const imageUrlFromContent = extractImageUrlFromMarkdown(content);
    if (imageUrlFromContent) {
      thumbnailPath = imageUrlFromContent; // Use the absolute URL from the editor content
    }
    // --- OLD LOGIC (retained for backward compatibility or separate image uploads):
    // Only process `images` array if no image was found in content AND `images` array exists
    else if (images && images.length > 0) {
      // Save thumbnail from the first image in the `images` array
      const thumbnailResult = await saveBase64Image(images[0], true);
      thumbnailPath = thumbnailResult.publicPath;

      // Save all images from the `images` array
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

    // First, find the post to ensure it exists and belongs to the user
    const post = await models.Posts.findOne({
      where: { id: id, userid: userid }, // Using existing `userid` casing
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you don't have permission to update.",
      });
    }

    let newThumbnailPath = null; // Start fresh for thumbnail
    let postImagesData = []; // To hold data for PostImages if needed

    // --- NEW LOGIC: Prioritize extracting thumbnail from updated editor content ---
    const imageUrlFromNewContent = extractImageUrlFromMarkdown(content);
    if (imageUrlFromNewContent) {
      newThumbnailPath = imageUrlFromNewContent;
    }
    // --- OLD LOGIC (retained for backward compatibility or separate image uploads):
    // Only process `images` array if no image was found in content AND `images` array exists
    else if (images) {
      // Check if `images` array was provided (even if empty)
      // If `images` array is provided, it implies a new set of images for the PostImages table.
      // So, clear existing images from disk and DB first.
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

        // Save new images to disk from the `images` array
        const savedImages = await Promise.all(
          images.map((img) => saveBase64Image(img, false))
        );

        postImagesData = savedImages.map((img) => ({
          postImage: img.publicPath,
          postid: id,
        }));

        // Insert new post images into DB
        await models.PostImages.bulkCreate(postImagesData);
      } else {
        // If `images` array was provided but empty, explicitly clear thumbnail
        newThumbnailPath = null;
      }
    }
    // If no `images` array provided AND no image in new content, thumbnail remains whatever it was or null

    // Update the post itself
    await post.update(
      {
        title,
        content,
        thumbnail: newThumbnailPath, // Use the determined thumbnail path
        userid: userid, // Using existing `userid` casing
        categoryid: categoryid, // Using existing `categoryid` casing
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

const getMostLikedPosts = async (req, res) => {
  try {
    const limit = 8; // As requested, fetch the top 8 posts

    // Dynamically get all original column names from your Posts model.
    // This ensures you get all standard post data (id, title, content, etc.).
    const postAttributes = Object.keys(models.Posts.rawAttributes);

    // Prepare the list of attributes to select:
    // 1. All original columns from the Posts model.
    // 2. A new computed column 'likesCount' that will hold the count of likes for each post.
    const attributesToSelect = [
      ...postAttributes,
      [
        models.sequelize.fn("COUNT", models.sequelize.col("Likes.id")),
        "likesCount",
      ], // SQL: COUNT(Likes.id) AS likesCount
    ];

    const posts = await models.Posts.findAll({
      attributes: attributesToSelect,
      include: [
        {
          // Include the User model to get the username of the post author.
          model: models.Users,
          as: "user",
          attributes: ["username"],
        },
        {
          // Include the Likes model to count the likes.
          // We don't need any attributes from the Likes table itself for this query.
          model: models.Likes,
          attributes: [],
          // 'duplicating: false' is important for performance and correct counting
          // when using aggregates with joins.
          duplicating: false,
        },
      ],
      // The 'group' clause is CRUCIAL when using aggregate functions (like COUNT).
      // You must list every non-aggregated column that you're selecting.
      group: [
        "Posts.id", // Always group by the primary key of the main model (Posts)
        // Group by all other original attributes of the Posts model.
        // We prefix with 'Posts.' because we're joining tables.
        ...postAttributes.map((attr) => `Posts.${attr}`),
        // If you are selecting attributes from an included model (like 'user.username'),
        // you MUST also include that model's primary key in the group clause.
        "user.id", // Assuming 'id' is the primary key of the Users model
      ],
      // Order the results by the computed 'likesCount' in descending order (highest to lowest).
      // Use models.sequelize.literal because 'likesCount' is an alias, not a physical column.
      order: [[models.sequelize.literal("likesCount"), "DESC"]],
      limit: limit, // Apply the limit of 8 posts
      // 'subQuery: false' is often necessary to ensure 'limit' works correctly
      // when combined with 'group' and 'include'.
      subQuery: false,
    });

    res.json({
      posts: posts, // Send the fetched posts array in the response
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

    // console.log("this is backend", posts);

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
  getMostLikedPosts,
  getPaginatedPosts,
};
