const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const config = require("./config/passport.js");

const app = express();

app.use(bodyParser.json());

const port = 8000;

app.listen(port, () => {
  console.log("We are live on " + port);
});
