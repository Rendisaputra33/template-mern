const express = require("express");
const app = express();
const { Modu } = require("module-alias/register");
const server = require("http").createServer(app);
const Socket = require("socket");
const Module = require("module");

// open connection socket
new Socket(server).init();
// initial all module
Module.Init(app);
// routes user
app.use("/api/users", require("./routes/user.routes"));
// routes chat
app.use("/api/chat", require("./routes/chat.routes"));
// static folder for uploded file
app.use('/uploads', express.static('uploads'));

server.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
  console.log(`running on http://localhost:${process.env.PORT}`);
});
