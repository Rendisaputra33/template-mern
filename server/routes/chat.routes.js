const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { Chat } = require("../models/Chat");
const multer = require("multer");

router.get("/getchat", auth, (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      res.send(chats);
    });
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage }).single('file')


router.post('/upload', auth, (req, res) => {
  upload(req, res, err => {
    if(err) return res.status(400).json({ success : false, err })
    res.status(200).json({ success: true, url: 'uploads/'+res.req.file.filename })
  })
});

module.exports = router;
