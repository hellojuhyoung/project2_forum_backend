const express = require("express");
const app = express();
const port = 5001;

// import database from models
const db = require("./models");

// req.body of (title from post) is undefiend by default
// need to parse the body with middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
const postRoutes = require("./routes/PostRoute");

// mounting routers
app.use("/posts", postRoutes);

app.get("/", function (req, res) {
  res.send("hello express");
});

// db.sequelize
//   .sync({ alter: false, force: false })
//   .then(() => {
//     console.log("db conntected");
//   })
//   .catch(console.error);

app.listen(port, function () {
  console.log(`server running on http://localhost:${port}`);
});
