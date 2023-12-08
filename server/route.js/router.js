import express from "express";
import { DumpAll, Start } from "../controller/DumpData.js";
import { Check1, Check2, FmDelay } from "../controller/Production.js";
import { SendData } from "../controller/sendData.js";

const route = express.Router();

route.get("/start", Start);
route.get("/dumpAll", DumpAll);

route.post("/sendData", SendData);
route.get("/add", Check2);
route.get("/add1", Check1);
route.post("/FMDelay", FmDelay);

// route.post('/file/upload',upload.single("file"), uploadFile )

export default route;
