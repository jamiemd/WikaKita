const passport = require("passport");
const User = require("../models/UserModel");
const app = require("../server");

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OKAY = 200;
const STATUS_NOT_FOUND = 404;

module.exports = app => {
  // signup
  app.post("/api/signup", function(req, res) {
    // console.log("req.body", req.body);
    const newUser = new User(req.body);
    //check the user contains all required data
    if (!newUser.username || !newUser.password || !newUser.email) {
      res.status(400).json({ error: "Missing required information" });
      return;
    }
    newUser.save((error, user) => {
      if (error) {
        if (error.name === "BulkWriteError") {
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
        res.status(STATUS_OKAY).json("success");
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
        console.log("err:", err);
        if (err) throw err;
        if (!user) {
          res.json({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          console.log(user.password, req.body.password);
          user.comparePassword(req.body.password, function(err, isMatch) {
            console.log(isMatch);
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, "wikakita");
              // return the information including token as JSON
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
