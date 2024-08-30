import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import { get } from "../database/pool-manager.js";

let config = {
  user: "Dashboard", //default is sa
  password: "Dashboard",
  server: "10.11.2.41", // for local machine
  database: "History", // name of database
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 20000000
};

/**
 * Fetches RM Thickness based on the provided period.
 * @param {Array} excel - The Excel data array.
 * @param {string} period - The period identifier (e.g., "Last Coil").
 * @returns {Promise<Array|null>} - The RM Thickness data.
 */
export const RMThickness = async (excel, period) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful!");

    let query = "";
    if (period === "Last Coil") {
      query = `SELECT [c_PieceName], [f_R2StripThk]
               FROM [History].[dbo].[r_RMSetup]
               WHERE [c_PieceName] = '${excel?.c_PieceName}'
               ORDER BY [c_PieceName];`;
    } else {
      const start = excel[0]?.c_PieceName;
      const end = excel[excel.length - 1]?.c_PieceName;
      query = `SELECT [c_PieceName], [f_R2StripThk]
               FROM [History].[dbo].[r_RMSetup]
               WHERE [c_PieceName] BETWEEN '${start}' AND '${end}'
               ORDER BY [c_PieceName];`;
    }

    const result = await pool.request().query(query);

    // Clean the result data before returning
    const cleanedData = result.recordset.map(cleanData);

    return cleanedData || null;
  } catch (err) {
    console.error("Error fetching RM Thickness:", err.message);
    throw err;
  }
};

/**
 * Fetches FM Delay data based on the Excel data.
 * @param {Array} excel - The Excel data array.
 * @returns {Promise<Object|null>} - The FM Delay data.
 */
export const FmDelay = async (excel) => {
  const startTime = new Date(excel[0].gt_HistoryKeyTm).toISOString();
  const endTime = new Date(
    excel[excel.length - 1].gt_HistoryKeyTm
  ).toISOString();

  try {
    const pool = await get("Operations", config);

    const query1 = `SELECT ISNULL(SUM(r_Delay.i_Duration/60), 0)
                    FROM Operations.dbo.r_Delay
                    WHERE (r_Delay.gt_StartTime >= '${startTime}')
                      AND (r_Delay.gt_EndTime <= '${endTime}');`;

    const query2 = `SELECT ISNULL(SUM(r_Delay.i_Duration/60), 0)
                    FROM Operations.dbo.r_Delay
                    WHERE (r_Delay.i_Duration >= 120 AND r_Delay.i_Duration <= 300)
                      AND (r_Delay.gt_StartTime >= '${startTime}')
                      AND (r_Delay.gt_EndTime <= '${endTime}');`;

    const query3 = `SELECT ISNULL(SUM(r_Delay.i_Duration/60), 0)
                    FROM Operations.dbo.r_Delay
                    WHERE (r_Delay.i_Duration > 300)
                      AND (r_Delay.gt_StartTime >= '${startTime}')
                      AND (r_Delay.gt_EndTime <= '${endTime}');`;

    const queryRM = `SELECT ISNULL(SUM(r_RchDelay.i_Duration/60), 0)
                     FROM Operations.dbo.r_RchDelay
                     WHERE (r_RchDelay.gt_StartTime >= '${startTime}')
                       AND (r_RchDelay.gt_EndTime <= '${endTime}')
                       AND (r_RchDelay.c_Location = 'RM');`;

    const queryFM = `SELECT ISNULL(SUM(r_RchDelay.i_Duration/60), 0)
                     FROM Operations.dbo.r_RchDelay
                     WHERE (r_RchDelay.gt_StartTime >= '${startTime}')
                       AND (r_RchDelay.gt_EndTime <= '${endTime}')
                       AND (r_RchDelay.c_Location = 'FM');`;

    const [reportAll, report2, report5, rmRollChange, fmRollChange] =
      await Promise.all([
        pool.request().query(query1),
        pool.request().query(query2),
        pool.request().query(query3),
        pool.request().query(queryRM),
        pool.request().query(queryFM)
      ]);

    const result = {
      total: reportAll.recordset[0][""],
      two: report2.recordset[0][""],
      five: report5.recordset[0][""],
      rmRollChange: rmRollChange.recordset[0][""],
      fmRollChange: fmRollChange.recordset[0][""]
    };

    // Clean the result data before returning
    return cleanData(result);
  } catch (err) {
    console.error("Error fetching FM Delay:", err.message);
    throw err;
  }
};
/**
 * Handles the API request to send data based on the specified period.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const SendData = async (req, res) => {
  try {
    const period = req?.body?.period;

    switch (period) {
      case "Last Coil":
        await handleLastCoil(req, res);
        break;

      case "Last 5 Coil":
        await handleLast5Coils(req, res);
        break;

      case "Last Hour":
        await handleLastHour(req, res);
        break;

      case "Last Shift":
        await handleLastShift(req, res);
        break;

      case "Last Day":
        await handleLastDay(req, res);
        break;

      default:
        if (period?.customp) {
          await handleCustomPiece(req, res, period.customp);
        } else if (period?.date && period?.time) {
          await handleCustomDateRange(req, res, period);
        } else {
          res.status(400).json({ message: "Invalid period specified." });
        }
        break;
    }
  } catch (error) {
    console.error("Error in SendData:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

/**
 * Handles the "Last Coil" period.
 */
const handleLastCoil = async (req, res) => {
  try {
    // Get the last entry from ExcelData
    const lastExcelEntry = await ExcelData.findOne()
      .sort({ gt_HistoryKeyTm: -1 })
      .exec();

    if (lastExcelEntry) {
      // Find the corresponding entry in PacingData using c_PieceName
      const correspondingPacingEntry = await PacingData.findOne({
        c_PieceName: lastExcelEntry.c_PieceName
      }).exec();

      if (correspondingPacingEntry) {
        // Call RMThickness function with the lastExcelEntry and requested period
        const RM = await RMThickness(lastExcelEntry, req?.body?.period);
        res.status(200).json({
          Excel: lastExcelEntry,
          pacing: correspondingPacingEntry,
          RM
        });
      } else {
        res.status(404).json({ message: "No matching pacing data found." });
      }
    } else {
      res.status(404).json({ message: "No Excel data found." });
    }
  } catch (error) {
    console.error("Error handling Last Coil:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Handles the "Last 5 Coils" period.
 */
const handleLast5Coils = async (req, res) => {
  try {
    // Get the last 5 entries from ExcelData
    const last5ExcelEntries = await ExcelData.find()
      .sort({ gt_HistoryKeyTm: -1 })
      .limit(5)
      .exec();

    if (last5ExcelEntries.length > 0) {
      // Find the corresponding entries in PacingData using c_PieceName
      const correspondingPacingEntries = await Promise.all(
        last5ExcelEntries.map(async (excelEntry) => {
          return await PacingData.findOne({
            c_PieceName: excelEntry.c_PieceName
          }).exec();
        })
      );

      // Filter out any null entries (if no corresponding pacing data was found)
      const validPacingEntries = correspondingPacingEntries.filter(
        (entry) => entry !== null
      );

      if (validPacingEntries.length > 0) {
        // Call RMThickness and FmDelay functions with the valid data
        const RM = await RMThickness(last5ExcelEntries, req?.body?.period);
        const RollChange = await FmDelay(last5ExcelEntries);

        res.status(200).json({
          Excel: last5ExcelEntries,
          pacing: validPacingEntries,
          RM,
          RollChange
        });
      } else {
        res.status(404).json({
          message: "No matching pacing data found for the last 5 coils."
        });
      }
    } else {
      res.status(404).json({ message: "No Excel data found." });
    }
  } catch (error) {
    console.error("Error handling Last 5 Coils:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};
/**
 * Handles the "Last Hour" period.
 */
const handleLastHour = async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Get the last hour's entries from ExcelData
    const lastHourExcelEntries = await ExcelData.find({
      gt_HistoryKeyTm: { $gte: oneHourAgo }
    }).sort({ gt_HistoryKeyTm: -1 });

    if (lastHourExcelEntries.length > 0) {
      // Find the corresponding pacing entries using c_PieceName
      const correspondingPacingEntries = await Promise.all(
        lastHourExcelEntries.map(async (excelEntry) => {
          return await PacingData.findOne({
            c_PieceName: excelEntry.c_PieceName,
            gt_HistoryKeyTm: { $gte: oneHourAgo }
          }).exec();
        })
      );

      // Filter out any null entries (if no corresponding pacing data was found)
      const validPacingEntries = correspondingPacingEntries.filter(
        (entry) => entry !== null
      );

      if (validPacingEntries.length > 0) {
        // Call RMThickness and FmDelay functions with the valid data
        const RM = await RMThickness(lastHourExcelEntries, req?.body?.period);
        const RollChange = await FmDelay(lastHourExcelEntries);

        res.status(200).json({
          Excel: lastHourExcelEntries,
          pacing: validPacingEntries,
          RM,
          RollChange
        });
      } else {
        res.status(404).json({
          message: "No matching pacing data found for the last hour."
        });
      }
    } else {
      res
        .status(404)
        .json({ message: "No Excel data found for the last hour." });
    }
  } catch (error) {
    console.error("Error handling Last Hour:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Handles the "Last Day" period.
 */
const handleLastDay = async (req, res) => {
  try {
    // Calculate the start and end of the previous day
    const today = new Date();
    const startOfLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      0,
      0,
      0
    ).toISOString();
    const endOfLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      23,
      59,
      59
    ).toISOString();

    // Get the last day's entries from ExcelData
    const lastDayExcelEntries = await ExcelData.find({
      gt_HistoryKeyTm: { $gte: startOfLastDay, $lte: endOfLastDay }
    }).sort({ gt_HistoryKeyTm: 1 });

    if (lastDayExcelEntries.length > 0) {
      // Extract the c_PieceName values from the lastDayExcelEntries
      const pieceNames = lastDayExcelEntries.map((entry) => entry.c_PieceName);

      // Find the corresponding pacing entries using the extracted c_PieceName values
      const correspondingPacingEntries = await PacingData.find({
        c_PieceName: { $in: pieceNames }
      }).sort({ gt_HistoryKeyTm: 1 });

      // Call RMThickness and FmDelay functions with the Excel data
      const RM = await RMThickness(lastDayExcelEntries, req?.body?.period);
      const RollChange = await FmDelay(lastDayExcelEntries);

      res.status(200).json({
        Excel: lastDayExcelEntries,
        pacing: correspondingPacingEntries,
        RM,
        RollChange
      });
    } else {
      res
        .status(404)
        .json({ message: "No Excel data found for the last day." });
    }
  } catch (error) {
    console.error("Error handling Last Day:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Handles custom piece data based on the piece name.
 */
const handleCustomPiece = async (req, res, customPieceName) => {
  try {
    // Find the exact match for the custom piece name in both ExcelData and PacingData
    const Excel = await ExcelData.findOne({ c_PieceName: customPieceName });
    const pacing = await PacingData.findOne({ c_PieceName: customPieceName });

    if (Excel && pacing) {
      res.status(200).json({ Excel, pacing });
    } else {
      res.status(202).json("No ID Match found in DB");
    }
  } catch (error) {
    console.error("Error handling custom piece:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Handles custom date range data based on the provided period.
 */
const handleCustomDateRange = async (req, res, period) => {
  try {
    // Parse the start and end date-time from the provided period
    const startDate = new Date(`${period.date[0]}`);
    const endDate = new Date(`${period.date[1]}`);

    // Fetch data from ExcelData within the specified date range
    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: {
        $gte: startDate,
        $lte: endDate
      }
    });

    if (Excel.length > 0) {
      // Extract the c_PieceName values from the Excel entries
      const pieceNames = Excel.map((entry) => entry.c_PieceName);

      // Find the corresponding pacing entries using the extracted c_PieceName values
      const pacing = await PacingData.find({
        c_PieceName: { $in: pieceNames }
      });

      if (pacing.length > 0) {
        // Process the data using RMThickness and FmDelay
        const RM = await RMThickness(Excel, req?.body?.period);
        const RollChange = await FmDelay(Excel);

        // Respond with the fetched data
        res.status(200).json({
          Excel,
          pacing,
          RM,
          RollChange
        });
      } else {
        res.status(404).json({
          message: "No matching pacing data found for the specified date range."
        });
      }
    } else {
      // Respond with a message if no data was found in ExcelData
      res
        .status(404)
        .json({ message: "No Excel data found for the specified date range." });
    }
  } catch (error) {
    console.error("Error handling custom date range:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Get shift times for the current day
 */
const getShiftTimes = () => {
  const currentTime = new Date();

  // Define shift timings
  const shift1Start = new Date().setHours(6, 0, 0, 0); // 6:00 AM
  const shift1End = new Date().setHours(14, 0, 0, 0); // 2:00 PM
  const shift2Start = new Date().setHours(14, 0, 0, 0); // 2:00 PM
  const shift2End = new Date().setHours(22, 0, 0, 0); // 10:00 PM
  const shift3Start = new Date().setHours(22, 0, 0, 0); // 10:00 PM
  const shift3End = new Date().setHours(6, 0, 0, 0); // 6:00 AM (next day)

  return {
    shift1Start,
    shift1End,
    shift2Start,
    shift2End,
    shift3Start,
    shift3End,
    currentTime
  };
};

/**
 * Determine the current shift based on the current time
 */
const determineShift = (currentTime, shiftTimes) => {
  if (
    currentTime >= shiftTimes.shift1Start &&
    currentTime < shiftTimes.shift1End
  ) {
    return "A";
  } else if (
    currentTime >= shiftTimes.shift2Start &&
    currentTime < shiftTimes.shift2End
  ) {
    return "B";
  } else if (
    currentTime >= shiftTimes.shift3Start ||
    currentTime < shiftTimes.shift1Start
  ) {
    return "C";
  }
};

/**
 * Handles the "Last Shift" period.
 */
const handleLastShift = async (req, res) => {
  try {
    const shiftTimes = getShiftTimes();
    const currentShift = determineShift(shiftTimes.currentTime, shiftTimes);

    let startTime, endTime;

    if (currentShift === "A") {
      // Last shift is C (10 PM to 6 AM of the current day)
      startTime = new Date(shiftTimes.shift3Start);
      endTime = new Date(shiftTimes.shift1Start);
    } else if (currentShift === "B") {
      // Last shift is A (6 AM to 2 PM of the current day)
      startTime = new Date(shiftTimes.shift1Start);
      endTime = new Date(shiftTimes.shift1End);
    } else if (currentShift === "C") {
      // Last shift is B (2 PM to 10 PM of the current day)
      startTime = new Date(shiftTimes.shift2Start);
      endTime = new Date(shiftTimes.shift2End);
    }

    // Convert start and end times to ISO strings for querying MongoDB
    const startIso = new Date(startTime).toISOString();
    const endIso = new Date(endTime).toISOString();

    // Fetch data from ExcelData within the specified shift time range
    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: {
        $gte: startIso,
        $lte: endIso
      }
    });

    if (Excel.length > 0) {
      // Extract the c_PieceName values from the Excel entries
      const pieceNames = Excel.map((entry) => entry.c_PieceName);

      // Fetch corresponding pacing data using the extracted c_PieceName values
      const pacing = await PacingData.find({
        c_PieceName: { $in: pieceNames }
      });

      if (pacing.length > 0) {
        // Process the data using RMThickness and FmDelay
        const RM = await RMThickness(Excel, req?.body?.period);
        const RollChange = await FmDelay(Excel);

        // Respond with the fetched data
        res.status(200).json({
          Excel,
          pacing,
          RM,
          RollChange
        });

        console.log({
          Excel,
          pacing,
          RM,
          RollChange
        });
      } else {
        res.status(404).json({
          message: "No matching pacing data found for the last shift."
        });
      }
    } else {
      res
        .status(404)
        .json({ message: "No Excel data found for the last shift." });
    }
  } catch (error) {
    console.error("Error handling Last Shift:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Cleans an object by removing null or undefined keys and trimming string values.
 * @param {Object} data - The object to clean.
 * @returns {Object} - The cleaned object.
 */
const cleanData = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (value !== null && value !== undefined) {
      acc[key] = typeof value === "string" ? value.trim() : value;
    }
    return acc;
  }, {});
};
