// mounted router with /auth/...

const authController = require("../controllers/AuthController");
const express = require("express");
const authenticateToken = require("../middlewares/AuthMiddleware");
const router = express.Router();

//
router.get("/profile", authenticateToken, authController.getProfile);

// user login
router.post("/login", authController.login);

module.exports = router;
