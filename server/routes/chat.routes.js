const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { Chat } = require("../models/Chat");

router.get("/getchat", (req, res) => {
  Chat.find((err, chats) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(chats);
  });
});

module.exports = router;
