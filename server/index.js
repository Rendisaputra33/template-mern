const express = require("express");
const app = express();
const Module = require("./configs/Module");
const { User } = require("./models/User");
const { Modu } = require("module-alias/register");
const { hashPassword, comparePassword } = require("hash");
const { auth } = require("./middlewares/Auth");

Module.Init(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});

app.get("/coba", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

app.post("/api/users/register", async (req, res) => {
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

app.post("/api/users/login", (req, res) => {
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

app.get("/api/user/logout", auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
