const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
const config = require("./config/passport");

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

app.listen(port, () => {
  console.log("We are live on " + port);
});
