const express = require("express");
const app = express();
const Module = require("./server/configs/Module");
const { User } = require("./server/models/User");
const { Modu } = require("module-alias/register");
const pw = require("hash");

Module.Init(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
  console.log(pw);
});

app.post("/api/users/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: await pw.hashPassword(req.body.password),
  });

  await user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    if (userData) return res.json({ success: true, data: userData });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (!user) return res.json({ success: false, message: "email not found" });
    return (await pw.comparePassword(req.body.password, user.password))
      ? res.json({ success: true, message: "login success" })
      : res.json({ success: false, message: "password wrong" });
  });
});
