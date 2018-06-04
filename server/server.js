const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const config = require("./config/passport.js");

const app = express();

app.use(bodyParser.json());

const port = 8000;

require("./routes/auth")(app, {});

app.listen(port, () => {
  console.log("We are live on " + port);
});
