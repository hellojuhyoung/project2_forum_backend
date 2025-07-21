// backend/auth/AuthController.js
// after installing dotenv by using the command
// 'npm install dotenv' would need to import using the
// following line below ... then JWT_SECRET value is successfully
// imported from the local .env file
require("dotenv").config();

const models = require("../models");

// bcrypt and jwt imports
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");

// sending emails to the user via Gmail
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");

// reset password
const { Op } = require("sequelize");

// function to validate user information then login
// generate token and deliver token to the user
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await models.Users.findOne({ where: { username: username } });
    const validatePassword = await bcrypt.compare(password, user.password);
    const id = user.id;

    if (!user) {
      res.status(401).json({ result: false, message: "user cannot be found" });
    } else if (!validatePassword) {
      res.status(401).json({
        result: false,
        message: "please check your password or username",
      });
    }

    if (user && validatePassword) {
      const token = generateToken({ id: id, username: username });
      // res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });
      res.json({
        token: token,
        id,
        username,
        result: true,
        message: "login successful",
      });
    } else {
      res.json({ result: false, message: "login failed" });
    }
  } catch (error) {
    console.log(error);
    console.error("error user login");
    res.status(500).json({ result: false, error: "error user login" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ result: true, message: "Logout successful" });
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ result: false, error: "Logout failed" });
  }
}

const getProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    // console.log("this is req", req);

    const user = await models.Users.findByPk(userid, {
      attributes: ["id", "username"],
    });

    console.log("this is user", user);

    const token = generateToken({ id: user.id, username: user.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, token });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'gmail' as the service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  // Optional: Add host/port for more control if not using a predefined service
  // host: 'smtp.gmail.com',
  // port: 465,
  // secure: true, // true for 465, false for other ports
});

const sendUsernameEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADMIN, // Sender address
      to: email, // Recipient address
      subject: "Your Username for JL Forum", // Subject line
      html: `<p>Hello!</p>
             <p>Your username for our application is: <strong>${username}</strong></p>
             <p>Please keep this information secure.</p>
             <p>If you did not request this, please ignore this email.</p>`, // HTML body
    };
    await transporter.sendMail(mailOptions);
    console.log(`Username email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Failed to send username email to ${email}:`, error);
  }
};

const sendPasswordResetEmail = async (email, token) => {
  // IMPORTANT: Replace with your actual frontend domain!
  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset/password?token=${token}`;

  try {
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Password Reset Request for JL Forum",
      html: `<p>Hello!</p>
             <p>You recently requested to reset your password for your account.</p>
             <p>Please click on the following link to reset your password:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>
             <p>This link will expire in <strong>1 hour</strong>.</p>
             <p>If you did not request a password reset, please ignore this email.</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(
      `Password reset email sent successfully to ${email} with token: ${token}`
    );
  } catch (error) {
    console.error(`Failed to send password reset email to ${email}:`, error);
    // Log the error but don't expose sensitive info to the user
  }
};

const findUsername = async (req, res) => {
  const { email } = req.body;

  // Basic validation: Check if email is provided
  if (!email) {
    return res.status(400).json({ message: "Email address is required." });
  }

  try {
    // 1. Database Lookup using Sequelize
    const user = await models.Users.findOne({
      where: { email: email },
    });

    // 2. Conditional Response
    if (user) {
      // User found, proceed to send email (or simulate for now)
      await sendUsernameEmail(user.email, user.username);

      // Send a generic success message for security (don't confirm if email exists)
      return res.status(200).json({
        message:
          "If an account is associated with this email, your username has been sent to your inbox.",
      });
    } else {
      // User not found, still send a generic message to prevent enumeration attacks
      // (where an attacker could guess valid emails by checking responses)
      return res.status(200).json({
        message:
          "If an account is associated with this email, your username has been sent to your inbox.",
      });
    }
  } catch (error) {
    console.error("Error finding username:", error);
    // Send a generic error message
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email address is required." });
  }

  try {
    const user = await models.Users.findOne({ where: { email: email } });

    // Important: Always send a generic success message for security,
    // regardless of whether the email exists in your database.
    // This prevents malicious users from enumerating valid emails.
    if (user) {
      // 1. Generate a secure, unique token
      const token = crypto.randomBytes(32).toString("hex"); // 32 bytes gives a very long hex string

      // 2. Set token expiration (e.g., 1 hour from now)
      // Using moment:
      const expiry = moment().add(1, "hour").toDate();
      // Or using native Date:
      // const expiry = new Date();
      // expiry.setHours(expiry.getHours() + 1); // 1 hour from now

      // 3. Save the token and its expiry to the user record
      user.passwordToken = token;
      user.passwordTokenExpiry = expiry;
      await user.save(); // Save the updated user record to the database

      // 4. Send the password reset email
      await sendPasswordResetEmail(user.email, token);

      console.log(`Password reset token generated and saved for ${user.email}`);
    }

    // Always respond with a generic success message for security
    return res.status(200).json({
      message:
        "If an account is associated with this email, a password reset link has been sent to your inbox.",
    });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // 1. Basic validation for request body
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  // Basic password length validation (can be more robust with Joi/Express-validator)
  if (newPassword.length < 8 || newPassword.length > 16) {
    return res
      .status(400)
      .json({ message: "Password must be between 8 and 16 characters." });
  }

  try {
    // 2. Find user by password reset token and check expiry
    const user = await models.Users.findOne({
      where: {
        passwordToken: token,
        passwordTokenExpiry: {
          [Op.gt]: new Date(), // Check if the token expiry is greater than current time
        },
      },
    });

    if (!user) {
      // If user not found or token expired/invalid
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token." });
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

    // 4. Update user's password and clear token fields
    user.password = hashedPassword;
    user.passwordToken = null; // Clear the token
    user.passwordTokenExpiry = null; // Clear the expiry

    await user.save(); // Save the updated user to the database

    // 5. Send success response
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({
      message: "An internal server error occurred during password reset.",
    });
  }
};

module.exports = {
  login,
  logout,
  getProfile,
  findUsername,
  requestPasswordReset,
  resetPassword,
};
