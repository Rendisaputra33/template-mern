const soket = require("socket.io");
const { Chat } = require("../models/Chat");

class Socket {
  constructor(server) {
    this.io = soket(server, {
      cors: {
        origin: "http://192.168.43.163:3000",
      },
    });
  }

  init() {
    const { io } = this;
    io.on("connection", (socket) => {
      socket.on("Input Chat Message", (msg) => {
        const initialSave = this.saveChat(msg);
        this.inputChat(initialSave, io);
      });
    });
  }

  saveChat(msg) {
    const chat = new Chat({
      message: msg.chatMessage,
      sender: msg.userId,
      type: msg.type,
    });
    return chat;
  }

  inputChat(chat, io) {
    chat.save((err, chatData) => {
      if (err) return console.log(err);
      Chat.find({ _id: chatData._id })
        .populate("sender")
        .exec((err, chats) => {
          io.emit("Output Chat Message", chats);
        });
    });
  }
}

module.exports = Socket;
