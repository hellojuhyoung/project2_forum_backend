// backend/controllers/ImageController.js
const { saveBase64Image } = require("../utils/imageProcess");
const path = require("path"); // Needed for path.extname

// This function will handle the image upload logic
async function uploadEditorImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    // Multer's memoryStorage gives us a buffer.
    // Your saveBase64Image function expects a Base64 string.
    // So, we convert the buffer back to Base64 temporarily.
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    // Call your existing saveBase64Image function
    // This saves the image to the local 'uploads' directory
    const result = await saveBase64Image(base64Image, false); // false for not a thumbnail

    // --- CRITICAL CHANGE: Construct the absolute URL ---
    // You MUST set process.env.BACKEND_PUBLIC_URL in your Elastic Beanstalk environment variables.
    // Example: https://forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com
    const backendPublicBaseUrl = process.env.BACKEND_PUBLIC_URL;

    if (!backendPublicBaseUrl) {
      console.error(
        "BACKEND_PUBLIC_URL environment variable is not set. Images may not load correctly."
      );
      // Fallback to relative path or throw an error if this is critical
      // For now, we'll return a 500 if it's not set in production.
      if (process.env.NODE_ENV === "production") {
        return res.status(500).json({
          message: "Server configuration error: BACKEND_PUBLIC_URL missing.",
        });
      }
      // In development, you might default to localhost
      // backendPublicBaseUrl = 'http://localhost:5001';
    }

    const absoluteImageUrl = `${backendPublicBaseUrl}${result.publicPath}`;

    console.log("Image saved to:", absoluteImageUrl); // Log the absolute URL for debugging

    // Send back the absolute URL to the frontend
    res.status(200).json({ url: absoluteImageUrl });
  } catch (error) {
    console.error("Error in ImageController.uploadEditorImage:", error);
    res.status(500).json({ message: "Failed to upload image." });
  }
}

module.exports = {
  uploadEditorImage,
};
