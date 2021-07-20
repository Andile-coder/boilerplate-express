var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.get("/", (req, res) => {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});
app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

app.post("/name", function (req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;

module.exports = app;
