const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { Chat } = require("../models/Chat");

router.get("/getchat", auth, (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      res.send(chats);
    });
});

module.exports = router;
