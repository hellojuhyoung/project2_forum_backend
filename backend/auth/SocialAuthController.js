// auth/SocialAuthController.js

const passport = require("passport"); // Import passport here as well
const jwt = require("jsonwebtoken"); // Assuming you use it for local tokens

const SocialAuthController = {
  // Method to initiate Google Login
  // This will call passport.authenticate as middleware
  googleLogin: (req, res, next) => {
    // passport.authenticate returns a middleware function.
    // We execute it here with req, res, next to initiate the OAuth flow.
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  },

  // Method for the Google OAuth callback
  // This runs AFTER Passport has successfully authenticated the user
  googleCallback: (req, res) => {
    // If authentication is successful, req.authInfo contains custom info from done() callback
    const { appToken, isNewUser } = req.authInfo;
    const userId = req.user.id; // The user object from your DB

    // Determine redirect path based on whether it's a new social user needing onboarding
    const redirectPath = isNewUser
      ? `/profile-completion` // Frontend route for new social users to complete profile
      : `/dashboard`; // Frontend route for returning users

    // Redirect to your frontend, passing the token and new user status
    res.redirect(
      `${process.env.FRONTEND_URL}${redirectPath}?token=${appToken}&userId=${userId}`
    );
  },

  // You would add methods for Kakao and Naver here later:
  // kakaoLogin: (req, res, next) => { passport.authenticate('kakao', { /* scope */ })(req, res, next); },
  // kakaoCallback: (req, res) => { /* kakao logic */ },
  // naverLogin: (req, res, next) => { passport.authenticate('naver', { /* scope */ })(req, res, next); },
  // naverCallback: (req, res) => { /* naver logic */ },
};

module.exports = SocialAuthController;
