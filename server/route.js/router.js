import express from "express";
import { DumpAll } from "../controller/DumpData.js";
import { Check1, Check2 } from "../controller/Production.js";
import { FmDelay, SendData } from "../controller/sendData.js";

// Helper function to wrap async route handlers for centralized error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const route = express.Router();

// Route definitions with proper HTTP methods and centralized error handling

// Dump all data
route.get("/dumpAll", asyncHandler(DumpAll));

// Send data using POST method
route.post("/sendData", asyncHandler(SendData));

// Check Production (Check2 logic)
route.get("/add", asyncHandler(Check2));

// Check Production alternative (Check1 logic)
route.get("/add1", asyncHandler(Check1));

// FM
route.get("/FMDelay", asyncHandler(FmDelay));

// Un-comment and implement file upload functionality if needed in the future
// route.post('/file/upload', upload.single("file"), asyncHandler(uploadFile));

export default route;
