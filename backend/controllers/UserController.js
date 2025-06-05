const models = require("../models");
const bcrypt = require("bcrypt");
const salt = 10;

const multer = require("multer");
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be stored in 'uploads/profile/'
    cb(null, "uploads/profile/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: fieldname-timestamp.ext
    // Example: profilePicture-1678888888888.jpeg
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create the multer upload middleware instance
// It will handle a single file upload from a form field named 'profilePicture'
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB (adjust as needed)
  fileFilter: (req, file, cb) => {
    // Allow only image files (JPEG, JPG, PNG, GIF)
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error("Error: Images Only!")); // Reject the file
    }
  },
}).single("profilePicture");

// function to create user with its username, password, email and other new fields
async function createUser(req, res) {
  console.log("backend create user", req.body);
  // Wrap the entire createUser logic within the 'upload' middleware.
  // Multer will process the file upload first, then 'req.body' and 'req.file'
  // will be populated before the rest of your logic runs.
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      // Handle specific Multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          result: false,
          message: "File size too large. Max 5MB allowed.",
        });
      }
      // Catch other Multer errors (e.g., file type)
      return res.status(400).json({
        result: false,
        message: err.message || "Error uploading profile picture.",
      });
    }

    try {
      // Destructure all incoming fields from req.body
      const {
        username,
        password,
        email,
        fullName,
        gender,
        phoneNumber,
        dateOfBirth,
        occupation,
        preferredLanguage,
      } = req.body; // Multer parses form data into req.body

      // Ensure required fields are present
      if (!username || !password || !email) {
        return res.status(400).json({
          result: false,
          message: "Username, password, and email are required.",
        });
      }

      // Check if user already exists by username OR email
      const existingUser = await models.Users.findOne({
        where: {
          [models.Sequelize.Op.or]: [{ username: username }, { email: email }],
        },
      });

      if (existingUser) {
        let errorMessage = "User already exists.";
        if (existingUser.username === username) {
          errorMessage = "Username is already taken.";
        } else if (existingUser.email === email) {
          errorMessage = "Email is already registered.";
        }
        return res.status(409).json({ result: false, message: errorMessage });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);

      // Determine the path for the profile picture.
      // req.file will be populated by Multer if a file was uploaded.
      const profilePicturePath = req.file
        ? `/uploads/profile/${req.file.filename}`
        : null;

      // Construct the user object with all fields
      const user = {
        username: username,
        password: hashedPassword,
        email: email,
        fullName: fullName || null, // Set to null if empty string or undefined
        gender: gender || null,
        phoneNumber: phoneNumber || null,
        dateOfBirth: dateOfBirth || null, // Sequelize DATEONLY handles YYYY-MM-DD string
        occupation: occupation || null,
        preferredLanguage: preferredLanguage || null,
        profilePicture: profilePicturePath, // Store the path to the uploaded image
        loginMethod: "local",
        usernameUpdate: false,
      };

      // Create the user in the database
      await models.Users.create(user);

      // Send success response
      res
        .status(201)
        .json({ user, result: true, message: "Succeeded in creating user" });
    } catch (error) {
      console.error("Error creating user:", error);

      // Handle Sequelize unique constraint errors (e.g., duplicate username/email/phone)
      if (error.name === "SequelizeUniqueConstraintError") {
        let field = error.errors[0]?.path; // Get the field that caused the unique constraint error
        let msg = "";
        if (field === "username") msg = "This username is already taken.";
        else if (field === "email") msg = "This email is already registered.";
        else if (field === "phoneNumber")
          msg = "This phone number is already registered.";
        return res.status(409).json({
          result: false,
          message: msg || "A unique constraint error occurred.",
        });
      }
      // Handle Sequelize validation errors (e.g., invalid email format from isEmail validator)
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({
          result: false,
          message: "Validation error: " + errors.join(", "),
        });
      }

      // Generic internal server error
      res
        .status(500)
        .json({ result: false, message: "Error in creating user" });
    }
  });
}

// delete user with their associated posts
async function deleteUser(req, res) {
  try {
    const id = req.body.id;
    await models.Users.destroy({ where: { id: id } });
    res.json({ id, result: true, message: "succeeded in deleting user" });
  } catch (error) {
    console.log(error);
    console.error("error deleting user");
    res.json({ result: false, message: "error in deleting user" });
  }
}

// function to update user by 'id' (integer)
// function to update user by 'id' (integer)
async function updateUser(req, res) {
  // Wrap the entire updateUser logic within the 'upload' middleware.
  // Multer will process the file upload first, then 'req.body' and 'req.file'
  // will be populated before the rest of your logic runs.
  upload(req, res, async (err) => {
    // <--- MULTER MIDDLEWARE WRAPPER
    if (err) {
      console.error("File upload error during update:", err);
      // Handle specific Multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          result: false,
          message: "File size too large. Max 5MB allowed.",
        });
      }
      // Catch other Multer errors (e.g., file type)
      return res.status(400).json({
        result: false,
        message:
          err.message || "Error uploading profile picture during update.",
      });
    }

    try {
      const id = req.params.id; // User ID from URL parameters
      console.log(`Updating user with ID: ${id}`);
      console.log("Request body (text fields):", req.body); // Contains username, email, fullName, etc.
      console.log("Uploaded file (from Multer):", req.file); // Contains info about the uploaded profilePicture

      // Destructure all possible fields from req.body sent by the frontend
      const {
        username,
        email,
        fullName,
        gender,
        phoneNumber,
        dateOfBirth,
        occupation,
        preferredLanguage,
        clearProfilePicture, // This flag will be 'true' (as a string) if user wants to remove image
      } = req.body;

      // Build the update object dynamically, only including fields that were actually sent
      const updateFields = {};

      // Only add fields to updateFields if they are present and not undefined
      // Note: username is usually not updated via profile edit, but including for completeness
      if (username !== undefined) updateFields.username = username;
      if (email !== undefined) updateFields.email = email;
      if (fullName !== undefined) updateFields.fullName = fullName;
      if (gender !== undefined) updateFields.gender = gender;
      if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
      if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth; // Store as string (date)
      if (occupation !== undefined) updateFields.occupation = occupation;
      if (preferredLanguage !== undefined)
        updateFields.preferredLanguage = preferredLanguage;

      // --- Profile Picture Handling Logic ---
      let oldProfilePicturePathInDB = null;

      // First, retrieve the current user's profile picture path from the database
      // We need this to potentially delete the old file if a new one is uploaded or current is cleared
      const currentUser = await models.Users.findByPk(id);
      if (currentUser && currentUser.profilePicture) {
        oldProfilePicturePathInDB = currentUser.profilePicture;
      }

      if (req.file) {
        // CASE 1: A NEW profile picture was uploaded
        // Multer stores the file and provides its details in req.file
        const newProfilePictureDbPath = "/uploads/profile/" + req.file.filename; // Path to save in DB
        updateFields.profilePicture = newProfilePictureDbPath;

        // If there was an old picture, delete it from the file system
        if (oldProfilePicturePathInDB) {
          // Construct the full absolute path to the old file on the server
          const fullOldPicPath = path.join(
            __dirname,
            "..",
            oldProfilePicturePathInDB
          );
          // Add a safety check: ensure the path is indeed within your 'uploads/profile' directory
          // to prevent accidentally deleting critical system files.
          if (
            fs.existsSync(fullOldPicPath) &&
            fullOldPicPath.startsWith(
              path.join(__dirname, "..", "uploads", "profile")
            )
          ) {
            fs.unlink(fullOldPicPath, (err) => {
              if (err)
                console.error("Error deleting old profile picture:", err);
              else
                console.log(
                  "Old profile picture deleted successfully:",
                  fullOldPicPath
                );
            });
          }
        }
      } else if (clearProfilePicture === "true") {
        // CASE 2: User explicitly clicked "Remove Image" on the frontend
        updateFields.profilePicture = null; // Set profilePicture to NULL in the database

        // If there was an old picture, delete it from the file system
        if (oldProfilePicturePathInDB) {
          const fullOldPicPath = path.join(
            __dirname,
            "..",
            oldProfilePicturePathInDB
          );
          if (
            fs.existsSync(fullOldPicPath) &&
            fullOldPicPath.startsWith(
              path.join(__dirname, "..", "uploads", "profile")
            )
          ) {
            fs.unlink(fullOldPicPath, (err) => {
              if (err)
                console.error(
                  "Error deleting old profile picture on clear:",
                  err
                );
              else
                console.log(
                  "Old profile picture deleted successfully on clear:",
                  fullOldPicPath
                );
            });
          }
        }
      }
      // CASE 3: No new file uploaded, and no clear flag. The profilePicture field remains untouched in the DB.

      // --- Perform the Database Update ---
      // Use findByPk to get the instance, then update it. This is often more reliable
      // especially if you need to access instance methods or hooks.
      const userToUpdate = await models.Users.findByPk(id);

      if (!userToUpdate) {
        return res
          .status(404)
          .json({ result: false, message: "User not found." });
      }

      await userToUpdate.update(updateFields); // Update the instance

      // Fetch the updated user data to send back to the frontend (optional, but good practice)
      const updatedUser = await models.Users.findByPk(id, {
        attributes: { exclude: ["password"] }, // Exclude password from response for security
      });

      res.json({
        user: updatedUser, // Send back the updated user object
        result: true,
        message: "User profile updated successfully!",
      });
    } catch (error) {
      console.error("Error in updateUser controller (general catch):", error);
      // Handle Sequelize unique constraint errors (e.g., duplicate email/phone if updated)
      if (error.name === "SequelizeUniqueConstraintError") {
        let field = error.errors[0]?.path;
        let msg = "";
        // Username is typically not updated via this form, but email/phone might be
        if (field === "email") msg = "This email is already registered.";
        else if (field === "phoneNumber")
          msg = "This phone number is already registered.";
        return res.status(409).json({
          result: false,
          message: msg || "A unique constraint error occurred.",
        });
      }
      // Handle Sequelize validation errors
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({
          result: false,
          message: "Validation error: " + errors.join(", "),
        });
      }

      res.status(500).json({
        result: false,
        message: "Internal server error during profile update",
        details: error.message,
      });
    }
  });
}

// get a single user information
async function getUser(req, res) {
  try {
    // since the userid is contained in the url instead of the body
    // in json format... ex) /users/${id}, the variable id
    // is set to req.params.id rather than body
    const id = req.params.id;
    const user = await models.Users.findOne({ where: { id: id } });

    res.json({
      user,
      result: true,
      message: "succeeded in getting user",
    });
  } catch (error) {
    console.log(error);
    console.error("error in getting user");
    res.status(500).json({ result: false, error: "error getting user" });
  }
}

// get all the posts written by user
async function getUserPosts(req, res) {
  try {
    const id = req.params.id;
    const postByUser = await models.Posts.findAll({
      where: { userid: id },
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
      postByUser,
      result: true,
      message: "succeeded in getting posts by user",
    });
  } catch (error) {
    console.log(error);
    console.error("error in getting posts by user");
    res
      .status(500)
      .json({ result: false, error: "error getting posts by user" });
  }
}

const validateUsername = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ message: "username query parameter required" });
  }

  try {
    const user = await models.Users.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res
        .status(200)
        .json({ isAvailable: true, message: "username is available" });
    } else {
      return res
        .status(200)
        .json({ isAvailable: false, message: "username is already taken" });
    }
  } catch (error) {
    console.error("error checking username availability", error);
    return res
      .status(500)
      .json({ message: "internal server error during username check" });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUserPosts,
  validateUsername,
};
