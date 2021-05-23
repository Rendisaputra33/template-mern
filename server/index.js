const express = require("express");
const app = express();
const Module = require("./configs/Module");
const { Modu } = require("module-alias/register");
const { auth } = require("./middlewares/Auth");
const userRoute = require("./routes/user.routes");
const cors = require("cors");
const { Chat } = require("./models/Chat");
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
    const chat = new Chat({
      message: msg.chatMessage,
      sender: msg.userId,
      type: msg.type,
    });

    chat.save((err, chatData) => {
      return io.emit("Output Chat Message", chatData);
    });
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

app.get("/api/getChat", (req, res) => {
  Chat.find(function (err, chats) {
    if (err) return res.send(err);
    res.send(chats);
  });
});

app.use("/api/chat", require("./routes/chat.routes"));

app.use("/uploads", express.static("uploads"));

server.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});
