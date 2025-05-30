// mounted router with /auth/...

const authController = require("../auth/AuthController");
const SocialAuthController = require("../auth/SocialAuthController");
const express = require("express");
const authenticateToken = require("../middlewares/AuthMiddleware");
const router = express.Router();
const passport = require("passport");

// get request
router.get("/profile", authenticateToken, authController.getProfile);
// Route to initiate Google OAuth login
router.get("/google", SocialAuthController.googleLogin);

// Route to handle Google OAuth callback after user authenticates
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`, // Redirect on failure
    session: false, // Crucial: We are not using session after this, issuing JWT
  }),
  SocialAuthController.googleCallback // Hand off to the controller method after successful auth
);
// user login
router.post("/login", authController.login);

module.exports = router;
