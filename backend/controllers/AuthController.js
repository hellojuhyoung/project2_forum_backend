// after installing dotenv by using the command
// 'npm install dotenv' would need to import using the
// following line below ... then JWT_SECRET value is successfully
// imported from the local .env file
require("dotenv").config();

const models = require("../models");

// bcrypt and jwt imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// generate token
function generateToken(id, username) {
  const token = jwt.sign({ id: id, username: username }, secretKey, {
    expiresIn: "1h",
  });
  return token;
}

// function to validate user information then login
// generate token and deliver token to the user
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await models.Users.findOne({ where: { username: username } });
    const validatePassword = await bcrypt.compare(password, user.password);
    const id = user.id;

    if (!user) {
      res.status(401).json({ result: false, message: "user cannot be found" });
    } else if (!validatePassword) {
      res
        .status(401)
        .json({ result: false, message: "passwords do not match" });
    }

    if (user && validatePassword) {
      const token = generateToken(id, username);
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
      res.json({ id, username, result: true, message: "login successful" });
    } else {
      res.json({ result: false, message: "login failed" });
    }
  } catch (error) {
    console.log(error);
    console.error("error user login");
    res.status(500).json({ result: false, error: "error user login" });
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("this is req", req);

    const user = await models.Users.findByPk(userId, {
      attributes: ["id", "username"],
    });

    // console.log("this is user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, getProfile };
