// backend/routes/ImageUploadRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");

// Import the new image controller
const imageController = require("../controllers/ImageController"); // <--- NEW IMPORT

// Multer configuration for in-memory storage.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define CORS options for this specific route (consistent with app.js)
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "POST",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Dedicated endpoint for Toast UI Editor image uploads
// Route now just uses the controller function
router.post(
  "/upload-editor-image",
  cors(corsOptions),
  upload.single("image"),
  imageController.uploadEditorImage // <--- USE THE CONTROLLER FUNCTION HERE
);

module.exports = router;
