
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "dotenv/config";
import { ItemRoutes } from "./api/itemRoutes.js";
import cors from "cors";
import { database } from "./config/database.js"

class App {
  constructor() {
    this.app = express();
    this.config();
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static("../frontend/build"));
    }
    new ItemRoutes().routes(this.app)
    database.sync();
  }

  config() {
    this.app.use(cors()); 
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;