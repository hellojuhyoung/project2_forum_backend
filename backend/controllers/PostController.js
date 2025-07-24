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
  // FIX: Even more permissive regex for the URL part within Markdown link.
  // It matches any characters (except closing parenthesis) after http(s):// until the link's closing parenthesis.
  // This should handle complex paths, query parameters, and unusual characters like '!' within the URL.
  const imageRegex = /!\[.*?\]\((https?:\/\/[^)]+)\)/i; // Key change: `[^)]+` for the URL part
  const match = markdownContent.match(imageRegex);
  console.log(
    "[DEBUG - extractImageUrlFromMarkdown] Markdown Content:",
    markdownContent
  ); // Added for debugging
  console.log(
    "[DEBUG - extractImageUrlFromMarkdown] Regex Match:",
    match ? match[1] : "No match"
  ); // Added for debugging
  return match ? match[1] : null;
}

// function to create posts with its title, content, thumbnail, contentImage
async function createPost(req, res) {
  try {
    const { title, content, userid, categoryid, images } = req.body;
    let thumbnailPath = null; // Initialize thumbnailPath
    let postImagesData = [];

    // --- Start Debugging Block ---
    console.log("[DEBUG - createPost] Incoming content:", content);
    console.log(
      "[DEBUG - createPost] Incoming images array (length):",
      images ? images.length : 0
    );
    // --- End Debugging Block ---

    const imageUrlFromContent = extractImageUrlFromMarkdown(content);

    // Logic to determine thumbnailPath: prioritize URL from content, then local Base64, then fallback
    if (imageUrlFromContent) {
      console.log(
        "[DEBUG - createPost] Path 1: imageUrlFromContent FOUND:",
        imageUrlFromContent
      );
      try {
        // Attempt to save thumbnail from the extracted URL
        const thumbnailResult = await saveImageUrl(imageUrlFromContent, true);
        thumbnailPath = thumbnailResult.publicPath;
        console.log(
          "[DEBUG - createPost] Path 1.1: saveImageUrl SUCCEEDED, thumbnailPath:",
          thumbnailPath
        );
      } catch (urlProcessError) {
        console.warn(
          `[DEBUG - createPost] Path 1.2: saveImageUrl FAILED for URL: ${imageUrlFromContent}. Error:`,
          urlProcessError.message || urlProcessError
        );
        // If URL processing fails, try local images if available
        if (images && images.length > 0) {
          console.log(
            "[DEBUG - createPost] Path 1.2.1: Falling back to local image for thumbnail."
          );
          const thumbnailResult = await saveBase64Image(images[0], true);
          thumbnailPath = thumbnailResult.publicPath;
        } else {
          console.log(
            "[DEBUG - createPost] Path 1.2.2: No local images, setting thumbnailPath to /no-image.jpg."
          );
          thumbnailPath = "/no-image.jpg";
        }
      }
    }
    // If no URL image in content, check for local Base64 images
    else if (images && images.length > 0) {
      console.log(
        "[DEBUG - createPost] Path 2: imageUrlFromContent NOT found, using local images."
      );
      const thumbnailResult = await saveBase64Image(images[0], true);
      thumbnailPath = thumbnailResult.publicPath;
      console.log(
        "[DEBUG - createPost] Path 2.1: saveBase64Image SUCCESS, path:",
        thumbnailPath
      );
    }
    // If neither URL image nor local Base64 images are found, use default placeholder
    else {
      console.log(
        "[DEBUG - createPost] Path 3: No image found (URL or local), setting thumbnailPath to /no-image.jpg."
      );
      thumbnailPath = "/no-image.jpg"; // Ensure it's never null when saved
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

    // Handle saving all original content images (if they are local Base64 uploads)
    // This part should be independent of thumbnail logic for content images.
    if (images && images.length > 0) {
      const savedImages = await Promise.all(
        images.map((img) => saveBase64Image(img, false)) // save original size
      );
      postImagesData = savedImages.map((img) => ({
        postImage: img.publicPath,
      }));
      postImagesData.forEach((img) => (img.postid = post.id)); // Ensure postid is set
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

    const imageUrlFromNewContent = extractImageUrlFromMarkdown(content);

    // Logic to determine newThumbnailPath for update: prioritize URL from content, then local Base64, then retain existing or fallback
    if (imageUrlFromNewContent) {
      console.log(
        "[DEBUG - updatePost] Path 1: imageUrlFromNewContent FOUND:",
        imageUrlFromNewContent
      );
      try {
        const thumbnailResult = await saveImageUrl(
          imageUrlFromNewContent,
          true
        );
        newThumbnailPath = thumbnailResult.publicPath;
        console.log(
          "[DEBUG - updatePost] Path 1.1: saveImageUrl SUCCEEDED, newThumbnailPath:",
          newThumbnailPath
        );
      } catch (urlProcessError) {
        console.warn(
          `[DEBUG - updatePost] Path 1.2: saveImageUrl FAILED for URL: ${imageUrlFromNewContent}. Error:`,
          urlProcessError.message || urlProcessError
        );
        if (images && images.length > 0) {
          console.log(
            "[DEBUG - updatePost] Path 1.2.1: Falling back to local image for thumbnail."
          );
          const thumbnailResult = await saveBase64Image(images[0], true);
          newThumbnailPath = thumbnailResult.publicPath;
        } else {
          console.log(
            "[DEBUG - updatePost] Path 1.2.2: No local images, setting newThumbnailPath to /no-image.jpg."
          );
          newThumbnailPath = "/no-image.jpg";
        }
      }
    }
    // If no URL image in new content, check for local Base64 images
    else if (images) {
      // `images` can be an empty array if client explicitly cleared images
      console.log(
        "[DEBUG - updatePost] Path 2: imageUrlFromNewContent NOT found, using local images."
      );
      // Clear existing images from disk and DB first if new images are provided or cleared
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
        const thumbnailResult = await saveBase64Image(images[0], true);
        newThumbnailPath = thumbnailResult.publicPath;
        console.log(
          "[DEBUG - updatePost] Path 2.1: saveBase64Image SUCCESS, newThumbnailPath:",
          newThumbnailPath
        );

        const savedImages = await Promise.all(
          images.map((img) => saveBase64Image(img, false))
        );
        const postImagesData = savedImages.map((img) => ({
          postImage: img.publicPath,
          postid: id,
        }));
        await models.PostImages.bulkCreate(postImagesData);
      } else {
        console.log(
          "[DEBUG - updatePost] Path 2.2: Images array empty, setting newThumbnailPath to /no-image.jpg."
        );
        newThumbnailPath = "/no-image.jpg"; // If `images` array provided but empty, use default
      }
    }
    // If no new `images` array AND no new content URL, retain existing thumbnail or use default
    else {
      console.log(
        "[DEBUG - updatePost] Path 3: No new image found (URL or local), retaining existing thumbnail or using default."
      );
      newThumbnailPath = post.thumbnail || "/no-image.jpg"; // Retain existing or use default if existing is null
    }

    console.log(
      `[DEBUG - PostController] Final newThumbnailPath for database: ${newThumbnailPath}`
    );

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

    // FIX: Check if post was found before calling toJSON()
    if (!response) {
      console.log(`[DEBUG - getPost] Post with ID ${id} not found.`);
      return res.status(404).json({ result: false, message: "Post not found" });
    }

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
      // ✨ FIX: Explicitly include 'thumbnail' attribute
      attributes: [
        "id",
        "title",
        "thumbnail", // <--- ADDED THIS
        "createdAt",
        // Add other top-level Post attributes needed for the card
      ],
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
    res
      .status(500)
      .json({ result: false, message: "server error", error: error.message });
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
      attributes: attributesToSelect, // This should already include 'thumbnail' if it's a raw attribute
      include: [
        {
          model: models.Users,
          as: "user",
          attributes: ["username"], // FIX: Ensure username is explicitly included for MostLikedPosts
          duplicating: false, // Ensure this is false for correct user association
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
      // ✨ FIX: Explicitly include 'thumbnail' attribute
      attributes: [
        "id",
        "title",
        "thumbnail", // <--- ADDED THIS
        "createdAt",
        // Add other top-level Post attributes needed for the card
      ],
      include: [
        {
          model: models.Users,
          as: "user",
          attributes: ["username"], // FIX: Ensure username is explicitly included
        },
      ],
    });

    // FIX: Map to post.toJSON() to preserve nested user object structure
    const posts = rows.map((post) => post.toJSON());

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
