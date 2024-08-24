import sql2 from "mssql";
import { get } from "../database/pool-manager.js";

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "loloklol",
  server: process.env.DB_SERVER || "localhost",
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 1800000
};

/**
 * Executes production summary stats for a specific date range.
 */
const executeProductionSummaryStats = async (pool, start, end) => {
  try {
    const result = await pool
      .request()
      .query(`EXEC spGet_Production_Summary_Stats '${start}','${end}'`);
    return result.recordset[0];
  } catch (error) {
    console.error(`Error fetching production summary stats: ${error.message}`);
    throw error;
  }
};

/**
 * Generates an array of dates between two dates.
 */
const getDaysArray = (start, end) => {
  const arr = [];
  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

/**
 * Check2: Retrieve production data for each day of the current month up until today.
 */
export const Check2 = async (req, res) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful!");

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const startDate = `${year}-${month}-01T00:00:00Z`;
    const dayList = getDaysArray(new Date(startDate), new Date());

    const results = [];

    for (let i = 0; i < dayList.length - 1; i++) {
      const start = dayList[i].toISOString();
      const end = dayList[i + 1].toISOString();
      const report = await executeProductionSummaryStats(pool, start, end);
      results.push({ date: dayList[i], report });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error("Failed to retrieve production data:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to retrieve production data",
        error: error.message
      });
  }
};

/**
 * Generates shift times based on the current date.
 */
const getShiftTimes = (currentDate) => {
  const shift1 = new Date(currentDate).setHours(6, 30, 0, 0);
  const shift2 = new Date(currentDate).setHours(14, 30, 0, 0);
  const shift3 = new Date(currentDate).setHours(21, 30, 0, 0);
  const nextDayShift = new Date(currentDate).setHours(30, 30, 0, 0); // Next day 6:30

  return { shift1, shift2, shift3, nextDayShift };
};

/**
 * Check1: Retrieves production data in hourly intervals based on the current shift.
 */
export const Check1 = async (req, res) => {
  try {
    const pool = await get("Production2", config);
    const currentDate = new Date();
    const { shift1, shift2, shift3, nextDayShift } = getShiftTimes(currentDate);

    let start, end;
    if (currentDate >= shift1 && currentDate < shift2) {
      start = shift1;
      end = shift2;
    } else if (currentDate >= shift2 && currentDate < shift3) {
      start = shift2;
      end = shift3;
    } else if (currentDate >= shift3 && currentDate < nextDayShift) {
      start = shift3;
      end = nextDayShift;
    } else {
      return res.status(400).json({ message: "Please wait until 1:00 AM." });
    }

    const results = [];
    for (let i = 0; i < 8; i++) {
      const DateStart = new Date(start).setHours(
        new Date(start).getHours() + i
      );
      const DateEnd = new Date(DateStart).setHours(
        new Date(DateStart).getHours() + 1
      );
      const report = await executeProductionSummaryStats(
        pool,
        new Date(DateStart).toISOString(),
        new Date(DateEnd).toISOString()
      );
      results.push({
        start: new Date(DateStart).toISOString(),
        end: new Date(DateEnd).toISOString(),
        data: report
      });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error("Failed to retrieve production data:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to retrieve production data",
        error: error.message
      });
  }
};
