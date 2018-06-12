const jwt = require("jwt-simple");
const passport = require("passport");
const User = require("../models/UserModel");

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OKAY = 200;
const STATUS_NOT_FOUND = 404;

module.exports = app => {
  // signup
  app.post("/api/signup", function(req, res) {
    const newUser = new User(req.body);
    if (!newUser.username || !newUser.password || !newUser.email) {
      res.status(400).json({ error: "Missing required information" });
      return;
    }
    newUser.save((error, user) => {
      if (error) {
        if (error.name === "MongoError") {
          res
            .status(STATUS_USER_ERROR)
            .json({ error: "Username already exists." });
        } else if (error.name === "ValidationError") {
          res.status(STATUS_USER_ERROR).json({
            error: "Password must be at least 8 characters."
          });
        } else {
          res.status(STATUS_USER_ERROR).json({ error: "Error while adding" });
        }
      } else {
        console.log("no errors");
        res.status(STATUS_OKAY).json({ message: "Successfully registered" });
      }
    });
  });

  // login
  app.post("/api/login", function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ error: "Missing required information" });
      return;
    }
    User.findOne(
      {
        $or: [{ email: req.body.email }, { username: req.body.username }]
      },
      function(err, user) {
        if (err) throw err;
        if (!user) {
          res.json({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          user.comparePassword(req.body.password, function(err, isMatch) {
            // console.log("isMatch", isMatch);
            if (isMatch && !err) {
              var token = jwt.encode(user, "wikakita");
              res.json({
                success: true,
                token: "JWT " + token,
                user: req.body.username
              });
            } else {
              res.json({
                success: false,
                msg:
                  "Authentication failed. Username or password is incorrect. ",
                err
              });
            }
          });
        }
      }
    );
  });

  // logout
  app.get("/api/logout", function(req, res) {
    req.logout();
    res.json({
      status: "Logged Out",
      msg: "Please Login Again"
    });
  });

  //authenticate
  app.get(
    "api/authenticate",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      res.json({
        message: "User authenticated",
        user: req.user
      });
    }
  );

  // get all users
  app.get("/api/users", (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        sendUserError("500", res);
        return;
      }
      res.json(users);
    });
  });
};
