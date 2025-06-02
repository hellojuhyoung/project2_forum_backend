require("dotenv").config();

const express = require("express");
const path = require("path");
// add cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
const port = process.env.PORT_NUMBER;

// declare imports for swagger
const swaggerUi = require("swagger-ui-express"); // 입력
const swaggerFile = require("./swagger/swagger-output.json"); // 입력

// import database from models
const db = require("./models");

// for social logins google/kakao/naver
const passport = require("passport");
const session = require("express-session");
const setupPassport = require("./auth/passportConfig");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const cookieParser = require("cookie-parser");

// let server to use cors
// this is to prevent front to share the same resources with
// the backend; CORS is referred to cross-origin resource sharing
app.use(cors(corsOptions));
// req.body of (title from post) is undefiend by default
// need to parse the body with middleware
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// serve 'uploads' folder statically at the '/uploads' route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// session middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
setupPassport(app);

// routes
//
// post route
const postRoutes = require("./routes/PostRoute");
// user route
const userRoutes = require("./routes/UserRoute");
// auth route
const authRoutes = require("./routes/AuthRoute");
// category route
const categoryRoutes = require("./routes/CategoryRoute");
// like route
const likeRoutes = require("./routes/LikeRoute");
// mounting routers
//
// mount swagger router
// *use command node swagger.js
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// mounting post router
app.use("/posts", postRoutes);
// mounting user router
app.use("/users", userRoutes);
// mounting auth router
app.use("/auth", authRoutes);
// mounting category router
app.use("/categories", categoryRoutes);
// mounting like router
app.use("/likes", likeRoutes);

app.get("/", function (req, res) {
  res.send("hello express");
});

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("db conntected");
  })
  .catch(console.error);

app.listen(port, function () {
  console.log(`server running on http://localhost:${port}`);
});
