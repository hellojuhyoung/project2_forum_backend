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
function generateToken(username) {
  const token = jwt.sign({ username: username }, secretKey, {
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

    if (!user) {
      res.status(401).json({ result: false, message: "user cannot be found" });
    } else if (!validatePassword) {
      res
        .status(401)
        .json({ result: false, message: "passwords do not match" });
    }

    if (user && validatePassword) {
      const token = generateToken(username);
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
      res.json({ result: true, message: "login successful" });
    } else {
      res.json({ result: false, message: "login failed" });
    }
  } catch (error) {
    console.log(error);
    console.error("error user login");
    res.status(500).json({ result: false, error: "error user login" });
  }
}

module.exports = { login };
