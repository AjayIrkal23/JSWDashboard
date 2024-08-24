import express from "express";
import { DumpAll, Start } from "../controller/DumpData.js";
import { Check1, Check2 } from "../controller/Production.js";
import { SendData } from "../controller/sendData.js";

// Helper function to wrap async route handlers for centralized error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const route = express.Router();

// Route definitions with proper HTTP methods and centralized error handling

// Initiate data dump process
route.get("/start", asyncHandler(Start));

// Dump all data
route.get("/dumpAll", asyncHandler(DumpAll));

// Send data using POST method
route.post("/sendData", asyncHandler(SendData));

// Check Production (Check2 logic)
route.get("/check", asyncHandler(Check2));

// Check Production alternative (Check1 logic)
route.get("/check/alt", asyncHandler(Check1));

// Un-comment and implement file upload functionality if needed in the future
// route.post('/file/upload', upload.single("file"), asyncHandler(uploadFile));

export default route;
