const express = require("express");
const app = express();
const Module = require("./configs/Module");
const { Modu } = require("module-alias/register");
const { auth } = require("./middlewares/Auth");
const userRoute = require("./routes/user.routes");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

Module.Init(app);

app.use(cors());

app.use("/api/users", userRoute);

io.on("connection", (socket) => {
  socket.on("Input Chat Message", (msg) => {
    return io.emit("Output Chat Message", msg);
  });
});

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

app.use("/uploads", express.static("uploads"));

server.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});
