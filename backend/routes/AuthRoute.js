// mounted router with /auth/...

const authController = require("../controllers/AuthController");
const express = require("express");
const router = express.Router();

// user login
router.post("/", authController.login);

module.exports = router;
