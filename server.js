const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "angularjs")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "angularjs", "index.html"));
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
