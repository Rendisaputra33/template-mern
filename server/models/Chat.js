const { now } = require("moment");
const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
      ref: "User",
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chatSchema);

module.exports = { Chat };
