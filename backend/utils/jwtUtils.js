// backend/utils/jwtUtils.js
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // Make sure this is correctly loaded

// You can make this flexible to accept any payload
const generateToken = (payloadData) => {
  const token = jwt.sign(payloadData, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { generateToken };
