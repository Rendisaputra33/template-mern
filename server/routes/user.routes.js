const express = require("express");
const router = express.Router();
const { hashPassword, comparePassword } = require("hash");
const { auth } = require("../middlewares/Auth");
const { User } = require("../models/User");

router.post("/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: await hashPassword(req.body.password),
  });

  await user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    if (userData) return res.json({ success: true, data: userData });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    // cek email user
    if (!user) return res.json({ success: false, message: "email not found" });
    // cek password
    if (!(await comparePassword(req.body.password, user.password)))
      return res.json({ success: false, message: "password wrong" });
    // generate token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({ success: true });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.json({
    status: 'ok',
    data : 'hello'
  })
})

module.exports = router;
