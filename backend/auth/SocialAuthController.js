// backend/controllers/SocialAuthController.js

const passport = require("passport");
const { generateToken } = require("../utils/jwtUtils");

const SocialAuthController = {
  googleLogin: (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })(req, res, next);
  },

  googleCallback: (req, res) => {
    // req.user will contain the user object (id, email, etc.) from the DB
    // req.authInfo will contain the info object (now just { isNewUser }) from done()
    const { isNewUser } = req.authInfo;
    const userId = req.user.id;
    const userEmail = req.user.email;
    const username = req.user.username; // This might be a placeholder, but available if needed

    // Generate the token using ID and Email (for social logins)
    const appToken = generateToken({ id: userId, email: userEmail }); // Use object for payload

    // 1. Set the token in an HTTP-only cookie
    res.cookie("token", appToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    // 2. Determine redirect URL based on whether it's a new user
    let redirectUrl = `${process.env.FRONTEND_URL}`; // Default to main page

    if (isNewUser) {
      redirectUrl += `/account/update`; // Frontend route for new social users to complete profile
    }

    // Append essential user info as query parameters
    // Pass the actual username from req.user for existing users, or the email for new ones
    const displayUsername = isNewUser ? userEmail.split("@")[0] : username; // Use derived username or existing one

    redirectUrl += `?userId=${userId}&username=${displayUsername}&isNewUser=${isNewUser}&email=${userEmail}`;
    // The token is now in the cookie, no need to pass it in the URL query params for security.
    // Frontend will read it from document.cookie or via getCookie utility.

    res.redirect(redirectUrl);
  },
};

module.exports = SocialAuthController;
