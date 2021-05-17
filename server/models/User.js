const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlenght: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlenght: 8,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.methods.generateToken = function (cal) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);
  user.token = token;
  user.save((err, user) => {
    if (err) return cal(err);
    cal(null, user);
  });
};

userSchema.statics.findByToken = function (token, cal) {
  var user = this;
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cal(err);
      cal(null, user);
    });
  });
};

const User = mongoose.model("users", userSchema);

module.exports = { User };
