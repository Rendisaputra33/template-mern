const express = require("express");
const app = express();
const Module = require("./configs/Module");
const { Modu } = require("module-alias/register");
const { auth } = require("./middlewares/Auth");
const userRoute = require("./routes/user.routes");
const cors = require("cors");

Module.Init(app);

app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});

app.use("/api/users", userRoute);

app.get("/api/coba", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

app.get("/api/hello", auth, (req, res) => {
  res.json({
    data: "hello world!",
    about: "api nodejs",
  });
});


