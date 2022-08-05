const express = require("express");
const cors = require("cors");
const dbConnection = require("../dataBase/configDB");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";

    // Conection BD
    this.connectionDB();

    // Middleware
    this.middleware();

    // App paths
    this.routes();
  }

  async connectionDB() {
    await dbConnection();
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
