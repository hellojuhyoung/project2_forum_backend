const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  let token; // Declare token using 'let' so its value can be reassigned

  // 1. Attempt to get the token from the Authorization header (for local logins)
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract the token after 'Bearer '
  }

  // 2. If token is not found in Authorization header, try to get it from cookies (for social logins)
  // IMPORTANT: For req.cookies to work, you MUST have `cookie-parser` middleware
  // installed (`npm install cookie-parser`) and used in your main Express app file
  // (e.g., `app.use(cookieParser());`).
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token; // Get the token from the cookie named 'token'
  }

  // If after checking both places, no token is found, deny access
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  // Verify the found token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Log the specific verification error for debugging on the server side
      console.error("Token verification failed:", err);
      // Return 403 Forbidden if the token is invalid or expired
      return res.status(403).json({ message: "Invalid token" });
    }
    // If token is valid, attach the decoded payload (user information) to the request object
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
