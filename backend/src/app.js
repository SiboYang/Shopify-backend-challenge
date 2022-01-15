
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { Routes } from "./api/routes.js";
import cors from "cors";
import { database } from "./config/database.js"

class App {
  constructor() {
    this.app = express();
    this.config();
    new Routes().routes(this.app)
    database.sync();
  }

  config() {
    this.app.use(cors()); 
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;