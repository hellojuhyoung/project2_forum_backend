// backend/auth/passportConfig.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// REMOVE: const jwt = require("jsonwebtoken"); // No longer needed here for token generation
const db = require("../models");

const setupPassport = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.Users.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userEmail =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null;

          if (!userEmail) {
            return done(new Error("Google profile missing email."), null);
          }

          let user = await db.Users.findOne({ where: { email: userEmail } });
          let isNewUser = false; // Flag to indicate if it's a new registration

          if (user) {
            // User found with this email
            if (user.loginMethod === "local") {
              user.loginMethod = "google";
              await user.save();
            }
          } else {
            // No user found with this email, create a new one
            isNewUser = true; // Mark as new user
            user = await db.Users.create({
              username: userEmail.split("@")[0], // Still derive a placeholder username
              email: userEmail,
              loginMethod: "google",
              profilePicture: null,
              isProfileComplete: false, // Will be set to true after profile completion page
            });
          }

          // No longer generating token here.
          // Just pass the user object and the isNewUser flag to the callback handler.
          done(null, user, { isNewUser: isNewUser });
        } catch (error) {
          console.error("Error during Google OAuth callback:", error);
          done(error, null);
        }
      }
    )
  );
};

module.exports = setupPassport;
