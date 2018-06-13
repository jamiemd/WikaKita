const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const Auth = require("./routes/auth.js");
Auth(app);
const Flashcards = require("./routes/flashcards");
Flashcards(app);

const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(port, () => {
  console.log("We are live on " + port);
});
