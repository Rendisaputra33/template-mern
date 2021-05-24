const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    type: {
      type: String,
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chatSchema);

module.exports = { Chat };
