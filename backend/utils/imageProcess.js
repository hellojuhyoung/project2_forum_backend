// backend/utils/imageProcess.js
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function saveBase64Image(base64String, isThumbnail = false) {
  const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid base64 image string");

  const ext = matches[1].split("/")[1];
  const data = matches[2];
  const buffer = Buffer.from(data, "base64");

  const filename = `${uuidv4()}.${ext}`;
  const folder = isThumbnail ? "thumbnails" : "images";
  const uploadsDir = path.join(__dirname, "..", "uploads", folder);
  const filepath = path.join(uploadsDir, filename);
  const publicPath = `/uploads/${folder}/${filename}`;

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  if (isThumbnail) {
    await sharp(buffer).resize(334, 220).toFile(filepath);
  } else {
    fs.writeFileSync(filepath, buffer);
  }

  return { filename, publicPath };
}

// ✨ NEW FUNCTION: Fetches an image from a URL and saves it locally, can be a thumbnail
async function saveImageUrl(imageUrl, isThumbnail = false) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer(); // Get as ArrayBuffer
    const imageBuffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Node.js Buffer

    console.log(
      `[DEBUG - saveImageUrl] Fetched image buffer size: ${imageBuffer.length} bytes`
    );

    const contentType = response.headers.get("content-type");
    let ext = "jpg"; // Default extension

    if (contentType && contentType.startsWith("image/")) {
      ext = contentType.split("/")[1];
      // Basic validation for common image formats
      if (!["jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
        ext = "jpg"; // Fallback to jpg for safety
      }
    }

    const filename = `${uuidv4()}.${ext}`;
    const folder = isThumbnail ? "thumbnails" : "images";
    const uploadsDir = path.join(__dirname, "..", "uploads", folder);
    const filepath = path.join(uploadsDir, filename);
    const publicPath = `/uploads/${folder}/${filename}`;

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    //   if (isThumbnail) {
    //     await sharp(imageBuffer).resize(334, 220).toFile(filepath);
    //   } else {
    //     fs.writeFileSync(filepath, imageBuffer); // Save original size if not thumbnail
    //   }

    //   return { filename, publicPath };
    // } catch (error) {
    //   console.error(`Error in saveImageUrl for ${imageUrl}:`, error);
    //   throw error; // Re-throw to be caught by the calling controller
    // }

    try {
      if (isThumbnail) {
        console.log(
          `[DEBUG - saveImageUrl] Attempting Sharp resize for thumbnail to: ${filepath}`
        );
        await sharp(imageBuffer).resize(334, 220).toFile(filepath); // Resizing
        console.log(
          `[DEBUG - saveImageUrl] Successfully created thumbnail at: ${filepath}`
        );
      } else {
        console.log(
          `[DEBUG - saveImageUrl] Saving original image to: ${filepath}`
        );
        fs.writeFileSync(filepath, imageBuffer); // Original image save
        console.log(
          `[DEBUG - saveImageUrl] Successfully saved original image to: ${filepath}`
        );
      }
    } catch (sharpOrWriteError) {
      console.error(
        `[DEBUG - saveImageUrl] ERROR during Sharp/file write for ${
          isThumbnail ? "thumbnail" : "original"
        }:`,
        sharpOrWriteError
      );
      throw sharpOrWriteError; // Re-throw to be caught higher up
    }

    console.log(`[DEBUG - saveImageUrl] Returning publicPath: ${publicPath}`);
    return { filename, publicPath };
  } catch (error) {
    console.error(
      `[DEBUG - saveImageUrl] Unhandled error for URL ${imageUrl}:`,
      error
    );
    throw error;
  }
}

async function resizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);
}

module.exports = { resizeImage, saveBase64Image, saveImageUrl };
