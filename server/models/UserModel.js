const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/wikikita");

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

// UserModel.pre("save", function(next) {
//   console.log("usermodel pre called");
//   var user = this;
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

// UserModel.methods.comparePassword = function(password, cb) {
//   bcrypt.compare(password, this.password, (err, result) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, result);
//   });
// };

module.exports = mongoose.model("User", UserModel);
