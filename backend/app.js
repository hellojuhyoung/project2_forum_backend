const express = require("express");
const app = express();
const port = 5001;

app.get("/", function (req, res) {
  res.send("hello express");
});

app.listen(port, function () {
  console.log(`server running on http://localhost:${port}`);
});
