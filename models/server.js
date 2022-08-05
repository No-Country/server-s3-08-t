const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    console.log(this.port);

    // Conection BD

    // Middleware
    this.middleware();

    // App paths
    this.routes();
  }

  middleware() {
    // Cors
    this.app.use(cors());

    // Parse JSON body
    this.app.use(express.json());

    // Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user.router"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Online Server in port: ${this.port}`);
    });
  }
}

module.exports = Server;
