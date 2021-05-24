const mongoose = require("mongoose");

const initConnection = () => {
  let url = ''
  process.env.NODE_ENV === 'production' ? url = process.env.MONGO_URI_PRO : url = process.env.MONGO_URI_DEV
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("connection success"));
};

module.exports = initConnection;
