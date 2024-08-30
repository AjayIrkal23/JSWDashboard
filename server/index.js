import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
import Connection from "./database/db.js";
import route from "./route.js/router.js";
import { DumpAll, Start } from "./controller/DumpData.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

Connection();
app.listen(8000, () => {
  Start();
  DumpAll()
  console.log("listening on port " + 8000);
});
