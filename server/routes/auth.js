const passport = require("passport");
const User = require("../models/UserModel");
const jwt = require("jwt-simple");

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
  app.post(
    "/api/login",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing required information" });
        return;
      }
      User.findOne(
        {
          $or: [{ email: req.body.email }, { username: req.body.username }]
        },
        function(err, user) {
          console.log("err:", err);
          if (err) throw err;
          if (!user) {
            res.json({
              success: false,
              msg: "Authentication failed. User not found."
            });
          } else {
            console.log(user.password, req.body.password);
            user.comparePassword(req.body.password, function(err, isMatch) {
              console.log(isMatch);
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
    }
  );

  // logout
  app.get(
    "/api/logout",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      console.log("I am Logout");
      req.logout();
      res.status(200).redirect("/");
    }
  );

  // authenticate
  // app.post(
  //   "/profile",
  //   passport.authenticate("jwt", { session: false }),
  //   function(req, res) {
  //     res.send(req.user.profile);
  //   }
  // );
};
