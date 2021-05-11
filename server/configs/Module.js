const evn = require("dotenv");
const parser = require("body-parser");
const conection = require("./Connection");

class Module {
  env() {
    return evn.config();
  }

  bodyParser() {
    return parser;
  }

  connecting() {
    return conection();
  }
}

const Init = () => {
  const start = new Module();
  start.env();
  start.bodyParser();
  start.connecting();
};

module.exports = { Init };
