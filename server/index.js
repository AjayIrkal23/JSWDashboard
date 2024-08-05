import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Connection from "./database/db.js";
import route from "./route.js/router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

Connection();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
