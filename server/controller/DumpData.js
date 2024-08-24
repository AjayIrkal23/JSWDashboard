import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import cron from "node-cron";
import { get } from "../database/pool-manager.js";

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "loloklol",
  server: process.env.DB_SERVER || "localhost",
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 20000000
};

/**
 * Start a cron job that runs every minute and triggers data fetching.
 */
export const Start = async (req, res) => {
  try {
    const task = cron.schedule(
      "* * * * *",
      async () => {
        try {
          console.log("Running cron task every minute");
          await GetExcelReport();
        } catch (error) {
          console.error("Cron task error:", error.message);
        }
      },
      {
        scheduled: false
      }
    );

    task.start();
    res.status(200).json({ message: "Cron job started successfully" });
  } catch (error) {
    console.error("Failed to start cron job:", error.message);
    res
      .status(500)
      .json({ message: "Failed to start cron job", error: error.message });
  }
};

/**
 * Dump all data from the database and save it to MongoDB.
 */
export const DumpAll = async (req, res) => {
  console.log("Starting data dump...");
  try {
    const pool = await get("History", config);
    console.log("Database connection successful");

    const start = new Date("Oct 2023 1");
    const end = new Date("Oct 2023 29");

    const [excelReport, pacReport2] = await Promise.all([
      pool
        .request()
        .query(
          `SELECT * FROM r_PacingExcelReport WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
        ),
      pool
        .request()
        .query(
          `SELECT * FROM r_PacReport2 WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
        )
    ]);

    if (excelReport?.recordset?.length && pacReport2?.recordset?.length) {
      await saveDataToMongo(excelReport.recordset, ExcelData);
      await saveDataToMongo(pacReport2.recordset, PacingData);

      res.status(200).json({ message: "Data dump successful" });
    } else {
      res
        .status(404)
        .json({ message: "No data found for the given date range" });
    }
  } catch (error) {
    console.error("Data dump failed:", error.message);
    res.status(500).json({ message: "Data dump failed", error: error.message });
  }
};

/**
 * Fetch the latest Excel report and Pacing report from the database.
 */
export const GetExcelReport = async () => {
  try {
    const pool = await get("History", config);

    const [excelReport, pacReport2] = await Promise.all([
      pool
        .request()
        .query(
          `SELECT TOP (1) * FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
        ),
      pool
        .request()
        .query(
          `SELECT TOP (1) * FROM r_PacReport2 ORDER BY gt_HistoryKeyTm DESC`
        )
    ]);

    if (excelReport.recordset[0] && pacReport2.recordset[0]) {
      await saveNewData(excelReport.recordset[0], ExcelData);
      await saveNewData(pacReport2.recordset[0], PacingData);

      console.log("New data saved successfully");
    } else {
      console.log("No new data found");
    }
  } catch (error) {
    console.error("Failed to fetch Excel report:", error.message);
  }
};

/**
 * Corrects the ID in the database if the c_PieceName is incorrect.
 */
export const CorrectId = async () => {
  try {
    const excelData = await ExcelData.find({});
    const pacingData = await PacingData.find({});

    await correctPieceNames(excelData, ExcelData);
    await correctPieceNames(pacingData, PacingData);

    console.log("Successfully corrected IDs");
  } catch (error) {
    console.error("Failed to correct IDs:", error.message);
  }
};

/**
 * Save an array of data to MongoDB.
 * @param {Array} data - Array of records to be saved.
 * @param {Object} Model - Mongoose model.
 */
const saveDataToMongo = async (data, Model) => {
  for (const item of data) {
    try {
      await Model.create({
        ...item,
        gt_HistoryKeyTm: new Date(item.gt_HistoryKeyTm).toISOString()
      });
      console.log(`${item.c_PieceName} saved successfully`);
    } catch (error) {
      console.error(`Failed to save ${item.c_PieceName}:`, error.message);
    }
  }
};

/**
 * Save a new record to MongoDB if it doesn't already exist.
 * @param {Object} record - The record to be saved.
 * @param {Object} Model - Mongoose model.
 */
const saveNewData = async (record, Model) => {
  try {
    const exists = await Model.findOne({ c_PieceName: record.c_PieceName });
    if (!exists) {
      await Model.create({
        ...record,
        gt_HistoryKeyTm: new Date(record.gt_HistoryKeyTm).toISOString()
      });
      console.log(`${record.c_PieceName} saved successfully`);
    } else {
      console.log(`${record.c_PieceName} already exists`);
    }
  } catch (error) {
    console.error(`Failed to save ${record.c_PieceName}:`, error.message);
  }
};

/**
 * Correct the c_PieceName in the database records.
 * @param {Array} data - Array of records to be corrected.
 * @param {Object} Model - Mongoose model.
 */
const correctPieceNames = async (data, Model) => {
  for (const item of data) {
    if (item.c_PieceName.length > 10) {
      const trimmedName = item.c_PieceName.trim();
      await Model.findByIdAndUpdate(item._id, { c_PieceName: trimmedName });
      console.log(`${trimmedName} corrected successfully`);
    } else {
      console.log(`${item.c_PieceName} is already correct`);
    }
  }
};
