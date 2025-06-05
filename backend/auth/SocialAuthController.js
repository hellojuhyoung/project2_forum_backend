// backend/controllers/SocialAuthController.js

const passport = require("passport");
const { generateToken } = require("../utils/jwtUtils");

const SocialAuthController = {
  // google
  googleLogin: (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })(req, res, next);
  },

  googleCallback: (req, res) => {
    // req.user will contain the user object (id, email, etc.) from the DB
    // req.authInfo will contain the info object (now just { isNewUser }) from done()
    const { isNewUser, usernameUpdate } = req.authInfo;
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

    if (isNewUser || usernameUpdate) {
      redirectUrl += `/account/update`; // Frontend route for new social users to complete profile
    }

    // Append essential user info as query parameters
    // Pass the actual username from req.user for existing users, or the email for new ones
    const displayUsername = username;
    redirectUrl += `?userId=${userId}&username=${displayUsername}&isNewUser=${isNewUser}&email=${userEmail}`;
    // The token is now in the cookie, no need to pass it in the URL query params for security.
    // Frontend will read it from document.cookie or via getCookie utility.

    res.redirect(redirectUrl);
  },

  //
  //
  //
  // kakao
  kakaoLogin: (req, res, next) => {
    passport.authenticate("kakao", {
      scope: ["account_email"], // Request only email scope from Kakao, as configured in Kakao Dev console
      session: false,
    })(req, res, next);
  },

  kakaoCallback: (req, res) => {
    // This function will be reached after the KakaoStrategy successfully processes the user.
    // req.user and req.authInfo will be populated by Passport.
    const { isNewUser, usernameUpdate } = req.authInfo;
    const userId = req.user.id;
    const userEmail = req.user.email;
    const username = req.user.username; // This will be the username from your DB

    const appToken = generateToken({ id: userId, email: userEmail });

    res.cookie("token", appToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    let redirectUrl = `${process.env.FRONTEND_URL}`;
    if (isNewUser || usernameUpdate) {
      redirectUrl += `/account/update`;
    }

    // Append essential user info as query parameters
    const displayUsername = username;
    redirectUrl += `?userId=${userId}&username=${displayUsername}&isNewUser=${isNewUser}&email=${userEmail}`;

    res.redirect(redirectUrl);
  },
  //
  //
  //
  // naver
  naverLogin: (req, res, next) => {
    // Naver requires specific scopes, typically 'profile' and 'email' are default
    passport.authenticate("naver", {
      scope: ["profile", "email"],
      session: false,
    })(req, res, next);
  },

  naverCallback: (req, res) => {
    if (!req.authInfo) {
      console.error(
        "Authentication info (req.authInfo) is missing after Naver callback."
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=naver_auth_failed_no_info`
      );
    }

    const { isNewUser, usernameUpdate } = req.authInfo;
    const userId = req.user.id;
    const userEmail = req.user.email;
    const username = req.user.username; // This will be the username from your DB, populated from Naver nickname or email in strategy

    const appToken = generateToken({ id: userId, email: userEmail });

    res.cookie("token", appToken, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    let redirectUrl = `${process.env.FRONTEND_URL}`;
    if (isNewUser || usernameUpdate) {
      redirectUrl += `/account/update`;
    }

    // Use the username from the DB if user is not new, otherwise derive from email or Naver nickname
    const displayUsername = username;
    redirectUrl += `?userId=${userId}&username=${displayUsername}&isNewUser=${isNewUser}&email=${userEmail}`;

    res.redirect(redirectUrl);
  },
};

module.exports = SocialAuthController;
