const express = require("express");
// add cors
const cors = require("cors");
const app = express();
const port = 5001;

// declare imports for swagger
const swaggerUi = require("swagger-ui-express"); // 입력
const swaggerFile = require("./swagger/swagger-output.json"); // 입력

// import database from models
const db = require("./models");

// let server to use cors
app.use(cors());
// req.body of (title from post) is undefiend by default
// need to parse the body with middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// mounting routers
//
// mount swagger router
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// mounting post router
app.use("/posts", postRoutes);
// mounting user router
app.use("/users", userRoutes);
// mounting auth router
app.use("/auth", authRoutes);
// mounting category router
app.use("/categories", categoryRoutes);

app.get("/", function (req, res) {
  res.send("hello express");
});

db.sequelize
  .sync({ alter: false, force: false })
  .then(() => {
    console.log("db conntected");
  })
  .catch(console.error);

app.listen(port, function () {
  console.log(`server running on http://localhost:${port}`);
});
