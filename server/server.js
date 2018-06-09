const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const passport = require("passport");

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const User = require("./models/UserModel");
const Auth = require("./routes/auth.js");
Auth(app);

const port = 8000;

mongoose.Promise = global.Promise;
const connect = mongoose.connect("mongodb://localhost/test");

app.listen(port, () => {
  console.log("We are live on " + port);
});
