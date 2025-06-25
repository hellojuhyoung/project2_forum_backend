// mounted router with /auth/...

const authController = require("../auth/AuthController");
const SocialAuthController = require("../auth/SocialAuthController");
const express = require("express");
const authenticateToken = require("../middlewares/AuthMiddleware");
const router = express.Router();
const passport = require("passport");

// get request
router.get("/profile", authenticateToken, authController.getProfile);

// routes to handle google login
router.get("/google", SocialAuthController.googleLogin);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`, // Redirect on failure
    session: false, // Crucial: We are not using session after this, issuing JWT
  }),
  SocialAuthController.googleCallback // Hand off to the controller method after successful auth
);

// routes to handle kakao login
router.get("/kakao", SocialAuthController.kakaoLogin);
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false,
  }),
  SocialAuthController.kakaoCallback
);

// routes to handle naver login
router.get("/naver", SocialAuthController.naverLogin);
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false,
  }),
  SocialAuthController.naverCallback
);

// user login
router.post("/login", authController.login);

// user logout
router.post("/auth/logout", authController.logout);

// forgot username
router.post("/forgot/username", authController.findUsername);

// forgot passwrod
router.post("/request-password-reset", authController.requestPasswordReset);

// reset password
router.post("/reset-password", authController.resetPassword);

module.exports = router;
