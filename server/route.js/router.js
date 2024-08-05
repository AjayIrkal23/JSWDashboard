import express from "express";
import { DumpAll, Start } from "../controller/DumpData.js";
import { Check1, Check2 } from "../controller/Production.js";
import { SendData } from "../controller/sendData.js";

const router = express.Router();

router.get("/start", Start);
router.get("/dumpAll", DumpAll);

router.post("/sendData", SendData);
router.get("/add", Check2);
router.get("/add1", Check1);

// Uncomment and implement if needed
// import upload from "../middleware/upload.js";
// import { uploadFile } from "../controller/upload.js";
// router.post('/file/upload', upload.single("file"), uploadFile);

export default router;
