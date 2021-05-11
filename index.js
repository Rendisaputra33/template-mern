const express = require("express");
const app = express();
const Module = require("./server/configs/Module");

Module.Init();

app.listen(process.env.PORT || 3000, () => {
  console.log("server ok!");
});
