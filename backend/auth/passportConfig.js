// backend/auth/passportConfig.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

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

  // google
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
            if (user.loginMethod === "local" || user.loginMethod !== "google") {
              user.loginMethod = "google";
              await user.save();
            }
          } else {
            // No user found with this email, create a new one
            isNewUser = true; // Mark as new user
            let initialUsername = userEmail.split("@")[0];
            let tempUsername = initialUsername;
            let usernameSuffix = 0;
            let userCreated = false;
            let needsUpdate = false;

            while (!userCreated) {
              try {
                user = await db.Users.create({
                  username: tempUsername,
                  email: userEmail,
                  loginMethod: "google",
                  profilePicture: null,
                  isProfileComplete: false,
                  usernameUpdate: needsUpdate,
                });
                userCreated = true;
              } catch (error) {
                if (
                  error.name === "SequelizeUniqueConstraintError" &&
                  error.errors &&
                  error.errors.some((e) => e.path === "username")
                ) {
                  usernameSuffix++;
                  tempUsername = `${initialUsername}_${usernameSuffix}`;
                  needsUpdate = true; // Mark as needing update
                  console.warn(
                    `Duplicate username '${initialUsername}'. Trying: '${tempUsername}'`
                  );
                } else {
                  // It's another type of error, re-throw it
                  console.error("Error creating user:", error);
                  return done(error, null);
                }
              }
            }
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

  // kakao
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: process.env.KAKAO_REDIRECT_URI,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userEmail = profile._json.kakao_account
            ? profile._json.kakao_account.email
            : null;

          if (!userEmail) {
            console.warn("Kakao login: Email not provided or not consented.");
            return done(
              new Error("Kakao login failed: Email not provided or consented."),
              null
            );
          }

          let user = await db.Users.findOne({ where: { email: userEmail } });
          let isNewUser = false;

          if (user) {
            if (user.loginMethod === "local" || user.loginMethod !== "kakao") {
              user.loginMethod = "kakao";
              await user.save();
            }
          } else {
            // No user found with this email, create a new one
            isNewUser = true;
            let initialUsername = userEmail.split("@")[0];
            let tempUsername = initialUsername;
            let usernameSuffix = 0;
            let userCreated = false;
            let needsUpdate = false;

            while (!userCreated) {
              try {
                user = await db.Users.create({
                  username: tempUsername,
                  email: userEmail,
                  loginMethod: "kakao",
                  profilePicture: null,
                  isProfileComplete: false,
                  usernameUpdate: needsUpdate,
                });
                userCreated = true;
              } catch (error) {
                if (
                  error.name === "SequelizeUniqueConstraintError" &&
                  error.errors &&
                  error.errors.some((e) => e.path === "username")
                ) {
                  usernameSuffix++;
                  tempUsername = `${initialUsername}_${usernameSuffix}`;
                  needsUpdate = true;
                  console.warn(
                    `Duplicate username '${initialUsername}'. Trying: '${tempUsername}'`
                  );
                } else {
                  // It's another type of error, re-throw it
                  console.error("Error creating user:", error);
                  return done(error, null);
                }
              }
            }
          }

          done(null, user, { isNewUser: isNewUser });
        } catch (error) {
          console.error("Error during Kakao OAuth callback:", error);
          done(error, null);
        }
      }
    )
  );

  //
  //
  //
  // naver
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userEmail =
            profile.email || (profile._json && profile._json.email);
          const username =
            profile.displayName ||
            (profile._json && profile._json.nickname) ||
            userEmail.split("@")[0];
          const profilePicture =
            (profile._json && profile._json.profile_image) || null;

          if (!userEmail) {
            console.warn("Naver login: Email not provided or not consented.");
            return done(
              new Error("Naver login failed: Email not provided or consented."),
              null
            );
          }

          let user = await db.Users.findOne({ where: { email: userEmail } });
          let isNewUser = false;

          if (user) {
            if (user.loginMethod === "local" || user.loginMethod !== "naver") {
              user.loginMethod = "naver";
              await user.save();
            }
          } else {
            isNewUser = true;
            let initialUsername = userEmail.split("@")[0];
            let tempUsername = initialUsername;
            let usernameSuffix = 0;
            let userCreated = false;
            let needsUpdate = false;

            while (!userCreated) {
              try {
                user = await db.Users.create({
                  username: tempUsername,
                  email: userEmail,
                  loginMethod: "naver",
                  profilePicture: null,
                  isProfileComplete: false,
                  usernameUpdate: needsUpdate,
                });
                userCreated = true;
              } catch (error) {
                if (
                  error.name === "SequelizeUniqueConstraintError" &&
                  error.errors &&
                  error.errors.some((e) => e.path === "username")
                ) {
                  usernameSuffix++;
                  tempUsername = `${initialUsername}_${usernameSuffix}`;
                  needsUpdate = true;
                  console.warn(
                    `Duplicate username '${initialUsername}'. Trying: '${tempUsername}'`
                  );
                } else {
                  // It's another type of error, re-throw it
                  console.error("Error creating user:", error);
                  return done(error, null);
                }
              }
            }
          }

          done(null, user, { isNewUser: isNewUser });
        } catch (error) {
          console.error("Error during Naver OAuth callback:", error);
          done(error, null);
        }
      }
    )
  );
};

module.exports = setupPassport;
