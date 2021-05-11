const evn = require("dotenv");
const parser = require("body-parser");
const conection = require("./Connection");
const cookieParser = require("cookie-parser");
const loger = require("morgan");

class Module {
  env() {
    return evn.config();
  }

  bodyParser(app) {
    app.use(parser.urlencoded({ extended: false }));
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
}

const Init = (app) => {
  const start = new Module();
  start.env();
  start.bodyParser(app);
  start.connecting();
  start.cookieSetup(app);
  start.debug(app);
};

module.exports = { Init };
