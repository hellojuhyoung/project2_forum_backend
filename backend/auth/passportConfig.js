const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
// Import your User model here
const User = require("../models/User"); // Adjust path as needed

// This function will be called from app.js to configure passport
const setupPassport = (app) => {
  // Passport Serialization/Deserialization
  // Required for Passport's session management during the OAuth handshake
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id); // Use findByPk for Sequelize, or findById for Mongoose
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google Strategy Configuration
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });

          if (!user) {
            // Check if an existing local user has this email but no googleId
            let existingLocalUser = await User.findOne({
              where: { email: profile.emails[0].value, googleId: null },
            });

            if (existingLocalUser) {
              // Link existing local user with Google ID
              existingLocalUser.googleId = profile.id;
              await existingLocalUser.save();
              user = existingLocalUser;
            } else {
              // Create a new user if no existing local user or google user found
              user = await User.create({
                googleId: profile.id,
                username:
                  profile.displayName || profile.emails[0].value.split("@")[0],
                email: profile.emails[0].value,
                profilePicture:
                  profile.photos && profile.photos.length > 0
                    ? profile.photos[0].value
                    : null,
                isProfileComplete: false, // Mark as incomplete for onboarding
              });
            }
          }

          // Issue your own application's JWT
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          const appToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          done(null, user, {
            appToken: appToken,
            isNewUser: !user.isProfileComplete,
          }); // Pass isProfileComplete status
        } catch (error) {
          console.error("Error during Google OAuth callback:", error);
          done(error, null);
        }
      }
    )
  );
  // You would add other strategies (Kakao, Naver) here later
};

module.exports = setupPassport;
