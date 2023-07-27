import express from "express";
import { DumpAll, Start } from "../controller/DumpData.js";
import { Check2 } from "../controller/Production.js";
import { SendData } from "../controller/sendData.js";

const route = express.Router();

route.get("/start", Start);
route.get("/dumpAll", DumpAll);

route.post("/sendData", SendData);
route.get("/add2", Check2);

// route.post('/file/upload',upload.single("file"), uploadFile )

export default route;
