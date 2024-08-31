import sql2 from "mssql";
import { get } from "../database/pool-manager.js";

let config = {
  user: "Dashboard", // default is sa
  password: "Dashboard",
  server: "10.11.2.41", // for local machine
  database: "Production", // name of database
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 20000000
};

/**
 * Executes production summary stats for a specific date range.
 */
const executeProductionSummaryStats = async (pool, start, end) => {
  try {
    const result = await pool
      .request()
      .query(`EXEC spGet_Production_Summary_Stats '${start}','${end}'`);
    console.log(result.recordset[0]);
    return result.recordset[0];
  } catch (error) {
    console.error(`Error fetching production summary stats: ${error.message}`);
    throw error;
  }
};

/**
 * Generates shift times based on the current date.
 */
const getShiftTimes = (currentDate) => {
  const shift1Start = new Date(currentDate).setHours(6, 0, 0, 0); // 6:00 AM
  const shift1End = new Date(currentDate).setHours(14, 0, 0, 0); // 2:00 PM
  const shift2Start = new Date(currentDate).setHours(14, 0, 0, 0); // 2:00 PM
  const shift2End = new Date(currentDate).setHours(22, 0, 0, 0); // 10:00 PM
  const shift3Start = new Date(currentDate).setHours(22, 0, 0, 0); // 10:00 PM
  const shift3End = new Date(currentDate).setHours(30, 0, 0, 0); // 6:00 AM next day

  return {
    shift1Start,
    shift1End,
    shift2Start,
    shift2End,
    shift3Start,
    shift3End
  };
};

/**
 * Check1: Retrieves production data in hourly intervals based on the current shift.
 */
export const Check1 = async (req, res) => {
  try {
    const pool = await get("Production", config);
    const currentDate = new Date();
    const {
      shift1Start,
      shift1End,
      shift2Start,
      shift2End,
      shift3Start,
      shift3End
    } = getShiftTimes(currentDate);

    let start, end;
    if (currentDate >= shift1Start && currentDate < shift1End) {
      start = shift1Start;
      end = shift1End;
    } else if (currentDate >= shift2Start && currentDate < shift2End) {
      start = shift2Start;
      end = shift2End;
    } else if (currentDate >= shift3Start && currentDate < shift3End) {
      start = shift3Start;
      end = shift3End;
    } else {
      return res.status(400).json({ message: "No valid shift found." });
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
    res.status(500).json({
      message: "Failed to retrieve production data",
      error: error.message
    });
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
    res.status(500).json({
      message: "Failed to retrieve production data",
      error: error.message
    });
  }
};
