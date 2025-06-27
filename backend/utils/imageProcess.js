// to process the image use the sharp library
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
  // const rootUploadsDir = path.join(__dirname, "..", "uploads");
  const uploadsDir = path.join(__dirname, "..", "uploads", folder);
  const filepath = path.join(uploadsDir, filename);
  const publicPath = `/uploads/${folder}/${filename}`;

  // if (!fs.existsSync(rootUploadsDir)) {
  //   fs.mkdirSync(rootUploadsDir, { recursive: true });
  // }

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

async function resizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);
}

module.exports = { resizeImage, saveBase64Image };
