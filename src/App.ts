import express from "express";
import { connectMongo, log } from "./utils";
import { routes } from "./Routes";
import * as bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(routes);

connectMongo().then(() => {
  log.info("Connected to DB");
});
