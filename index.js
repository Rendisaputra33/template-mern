const express = require("express");
const app = express();
const Module = require("./server/configs/Module");
const { User } = require("./server/models/User");
const { Modu } = require("module-alias/register");
const hash = require("hash");

Module.Init(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});

app.post("/api/users/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: await hash(req.body.password),
  });

  await user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    if (userData) return res.json({ success: true, data: userData });
  });
});

app.post("/debug", async (req, res) => {
  res.json({
    status: 200,
    pw: await hash(req.body.pw),
  });
});
