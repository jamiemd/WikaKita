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

const Auth = require("./routes/auth.js");
Auth(app);
const Flashcards = require("./routes/flashcards");
Flashcards(app);

const port = 8000;

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/wikikita");

app.listen(port, () => {
  console.log("We are live on " + port);
});
