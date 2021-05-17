const mongoose = require("mongoose");

const initConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  
  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("connection success"));
};

module.exports = initConnection;
