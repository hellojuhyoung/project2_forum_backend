// middlewares/sessionMiddleware.js

const session = require("express-session");

// Configure the express-session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // IMPORTANT: Ensure SESSION_SECRET is in your backend .env file
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Example: 24 hours (optional)
  },
});

module.exports = sessionMiddleware;
