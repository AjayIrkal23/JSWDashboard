import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import { get } from "../database/pool-manager.js";

const config = {
  user: "sa",
  password: "loloklol",
  server: "localhost",
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 1800000
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
    return result.recordset || null;
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
  const startTime = excel[0].gt_HistoryKeyTm;
  const endTime = excel[excel.length - 1].gt_HistoryKeyTm;

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

    const [reportAll, report2, report5] = await Promise.all([
      pool.request().query(query1),
      pool.request().query(query2),
      pool.request().query(query3)
    ]);

    return {
      total: reportAll.recordset[0][""],
      two: report2.recordset[0][""],
      five: report5.recordset[0][""]
    };
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
    const Excel = await ExcelData.find().sort({ gt_HistoryKeyTm: -1 }).limit(1);
    const pacing = await PacingData.find()
      .sort({ gt_HistoryKeyTm: -1 })
      .limit(1);

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel[0], req?.body?.period);
      res.status(200).json({
        Excel: Excel[0],
        pacing: pacing[0],
        RM
      });
    } else {
      res.status(202).json("Data not yet in DB");
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
    const Excel = await ExcelData.find().sort({ gt_HistoryKeyTm: -1 }).limit(5);
    const pacing = await PacingData.find()
      .sort({ gt_HistoryKeyTm: -1 })
      .limit(5);

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel, req?.body?.period);
      const RollChange = await FmDelay(Excel);

      res.status(200).json({
        Excel,
        pacing,
        RM,
        RollChange
      });
    } else {
      res.status(202).json("Data not yet in DB");
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
    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: { $gte: oneHourAgo }
    }).sort({ gt_HistoryKeyTm: -1 });
    const pacing = await PacingData.find({
      gt_HistoryKeyTm: { $gte: oneHourAgo }
    }).sort({ gt_HistoryKeyTm: -1 });

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel, req?.body?.period);
      const RollChange = await FmDelay(Excel);

      res.status(200).json({
        Excel,
        pacing,
        RM,
        RollChange
      });
    } else {
      res.status(202).json("Data not yet in DB");
    }
  } catch (error) {
    console.error("Error handling Last Hour:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Handles the "Last Shift" period.
 */
const handleLastShift = async (req, res) => {
  // Shift timings are assumed to be predefined. Modify as needed.
  const shiftTimes = getShiftTimes();
  await handleShiftData(req, res, shiftTimes);
};

/**
 * Handles the "Last Day" period.
 */
const handleLastDay = async (req, res) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: { $gte: oneDayAgo }
    }).sort();
    const pacing = await PacingData.find({
      gt_HistoryKeyTm: { $gte: oneDayAgo }
    }).sort();

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel, req?.body?.period);
      const RollChange = await FmDelay(Excel);

      res.status(200).json({
        Excel,
        pacing,
        RM,
        RollChange
      });
    } else {
      res.status(202).json("Data not yet in DB");
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
    const regex = new RegExp(customPieceName.replace(/\s+/g, "\\s*"));
    const Excel = await ExcelData.findOne({ c_PieceName: regex });
    const pacing = await PacingData.findOne({ c_PieceName: regex });

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
 * Handles custom date range data.
 */
const handleCustomDateRange = async (req, res, period) => {
  try {
    const startDate = new Date(`${period.date[0]} ${period.time[0]}`);
    const endDate = new Date(`${period.date[1]} ${period.time[1]}`);

    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const pacing = await PacingData.find({
      gt_HistoryKeyTm: {
        $gte: startDate,
        $lte: endDate
      }
    });

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel, req?.body?.period);
      const RollChange = await FmDelay(Excel);

      res.status(200).json({
        Excel,
        pacing,
        RM,
        RollChange
      });
    } else {
      res.status(202).json("No ID Match found in DB");
    }
  } catch (error) {
    console.error("Error handling custom date range:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};

/**
 * Retrieves shift times for the current day.
 */
const getShiftTimes = () => {
  const shift1Start = new Date().setHours(6, 0, 0, 0);
  const shift1End = new Date().setHours(14, 0, 0, 0);
  const shift2Start = new Date().setHours(14, 0, 0, 0);
  const shift2End = new Date().setHours(22, 0, 0, 0);
  const shift3Start = new Date().setHours(22, 0, 0, 0);
  const shift3End = new Date();
  shift3End.setDate(shift3End.getDate() + 1);
  shift3End.setHours(6, 0, 0, 0);

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
 * Handles shift data based on the provided shift times.
 */
const handleShiftData = async (req, res, shiftTimes) => {
  try {
    const currentTime = new Date();

    let startTime, endTime;
    if (
      currentTime >= shiftTimes.shift1Start &&
      currentTime < shiftTimes.shift1End
    ) {
      startTime = shiftTimes.shift3Start;
      endTime = shiftTimes.shift3End;
    } else if (
      currentTime >= shiftTimes.shift2Start &&
      currentTime < shiftTimes.shift2End
    ) {
      startTime = shiftTimes.shift1Start;
      endTime = shiftTimes.shift1End;
    } else if (
      currentTime >= shiftTimes.shift3Start &&
      currentTime < shiftTimes.shift3End
    ) {
      startTime = shiftTimes.shift2Start;
      endTime = shiftTimes.shift2End;
    } else {
      return res.status(400).json({ message: "Invalid shift timings." });
    }

    const Excel = await ExcelData.find({
      gt_HistoryKeyTm: {
        $gte: new Date(startTime).toISOString(),
        $lte: new Date(endTime).toISOString()
      }
    });

    const pacing = await PacingData.find({
      gt_HistoryKeyTm: {
        $gte: new Date(startTime).toISOString(),
        $lte: new Date(endTime).toISOString()
      }
    });

    if (Excel.length > 0 && pacing.length > 0) {
      const RM = await RMThickness(Excel, req?.body?.period);
      const RollChange = await FmDelay(Excel);

      res.status(200).json({
        Excel,
        pacing,
        RM,
        RollChange
      });
    } else {
      res.status(202).json("Data not yet in DB");
    }
  } catch (error) {
    console.error("Error handling shift data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data.", error: error.message });
  }
};
