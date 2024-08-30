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
 * Dump all data from the database and save it to MongoDB.
 */
export const DumpAll = async (req, res) => {
  console.log("Starting data dump...");
  try {
    const startString = new Date("Oct 2023 1");
    const endString = new Date("Oct 2023 29");

    const pool = await get("History", config);
    console.log("Database connection successful");

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
      await saveCleanDataToMongoWithCheck(excelReport.recordset, ExcelData);
      await saveCleanDataToMongoWithCheck(pacReport2.recordset, PacingData);

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
 * Save an array of cleaned data to MongoDB, checking if the c_PieceName already exists.
 * @param {Array} data - Array of records to be saved.
 * @param {Object} Model - Mongoose model.
 */
const saveCleanDataToMongoWithCheck = async (data, Model) => {
  for (const item of data) {
    try {
      const cleanedItem = cleanObject(item);
      const exists = await Model.findOne({
        c_PieceName: cleanedItem.c_PieceName
      });

      if (!exists) {
        await Model.create({
          ...cleanedItem,
          gt_HistoryKeyTm: new Date(cleanedItem.gt_HistoryKeyTm).toISOString()
        });
        console.log(`${cleanedItem.c_PieceName} saved successfully`);
      } else {
        console.log(
          `${cleanedItem.c_PieceName} already exists, skipping save.`
        );
      }
    } catch (error) {
      console.error(`Failed to save ${item.c_PieceName}:`, error.message);
    }
  }
};

/**
 * Start a cron job that runs every minute and triggers data fetching.
 */
export const Start = async () => {
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
  } catch (error) {
    console.error("Failed to start cron job:", error.message);
  }
};

/**
 * Fetch the latest Excel report and Pacing report from the database.
 */
export const GetExcelReport = async () => {
  try {
    const pool = await get("History", config);

    // Fetch the top 1 c_PieceName from SQL
    const result = await pool
      .request()
      .query(
        `SELECT TOP (1) c_PieceName FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
      );

    const c_PieceName = result.recordset[0]?.c_PieceName;

    if (c_PieceName) {
      // Fetch the latest entry in MongoDB
      const latestMongoEntry = await ExcelData.findOne().sort({
        gt_HistoryKeyTm: -1
      });

      if (latestMongoEntry?.c_PieceName === c_PieceName) {
        console.log("Latest entry already exists in MongoDB, skipping save.");
        return;
      }

      // Fetch related records using c_PieceName
      const [excelReport, pacReport2] = await Promise.all([
        pool
          .request()
          .query(
            `SELECT * FROM r_PacingExcelReport WHERE c_PieceName = '${c_PieceName}'`
          ),
        pool
          .request()
          .query(
            `SELECT * FROM r_PacReport2 WHERE c_PieceName = '${c_PieceName}'`
          )
      ]);

      if (excelReport.recordset.length && pacReport2.recordset.length) {
        // Clean and save records
        await saveCleanDataToMongo(excelReport.recordset, ExcelData);
        await saveCleanDataToMongo(pacReport2.recordset, PacingData);

        console.log("New data saved successfully");
      } else {
        console.log("No matching data found");
      }
    } else {
      console.log("No data found");
    }
  } catch (error) {
    console.error("Failed to fetch Excel report:", error.message);
  }
};

/**
 * Save an array of cleaned data to MongoDB.
 * @param {Array} data - Array of records to be saved.
 * @param {Object} Model - Mongoose model.
 */
const saveCleanDataToMongo = async (data, Model) => {
  for (const item of data) {
    try {
      const cleanedItem = cleanObject(item);
      await Model.create({
        ...cleanedItem,
        gt_HistoryKeyTm: new Date(cleanedItem.gt_HistoryKeyTm).toISOString()
      });
      console.log(`${cleanedItem.c_PieceName} saved successfully`);
    } catch (error) {
      console.error(`Failed to save ${item.c_PieceName}:`, error.message);
    }
  }
};

/**
 * Remove unnecessary blank spaces from keys and values in an object.
 * @param {Object} obj - Object to be cleaned.
 * @returns {Object} - Cleaned object.
 */
const cleanObject = (obj) => {
  const cleanedObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const cleanKey = key.trim();
      const cleanValue =
        typeof obj[key] === "string" ? obj[key].trim() : obj[key];
      cleanedObj[cleanKey] = cleanValue;
    }
  }
  return cleanedObj;
};
