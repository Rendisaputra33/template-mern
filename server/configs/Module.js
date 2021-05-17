const evn = require("dotenv");
const parser = require("body-parser");
const conection = require("./Connection");
const cookieParser = require("cookie-parser");
const loger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require("cors");

class Module {
  env() {
    return evn.config();
  }

  bodyParser(app) {
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.json());
  }

  connecting() {
    return conection();
  }

  cookieSetup(app) {
    app.use(cookieParser());
  }

  debug(app) {
    app.use(loger("dev"));
  }

  corsSetup(app) {
    app.use(cors())
  }

}

const Init = (app) => {
  const start = new Module();
  start.env();
  start.bodyParser(app);
  start.connecting();
  start.cookieSetup(app);
  start.debug(app);
  start.corsSetup(app);
};

module.exports = { Init };
