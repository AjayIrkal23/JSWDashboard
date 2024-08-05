import sql from "mssql";
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

const DateJoin = (check) => {
  const [, date, month, year] = check.split(" ");
  return `${date} ${month} ${year}`;
};

export const RMThickness = async (excel, period) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful!");

    let query = `SELECT [c_PieceName], [f_R2StripThk] FROM [History].[dbo].[r_RMSetup] WHERE `;
    if (period === "Last Coil") {
      query += `[c_PieceName] = '${excel.c_PieceName}' ORDER BY [c_PieceName];`;
    } else {
      const start = excel[0].c_PieceName;
      const end = excel[excel.length - 1].c_PieceName;
      query += `[c_PieceName] BETWEEN '${start}' AND '${end}' ORDER BY [c_PieceName];`;
    }

    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error in RMThickness:", err);
  }
};

export const FmDelay = async (excel) => {
  const startTime = excel[0].gt_HistoryKeyTm;
  const endTime = excel[excel.length - 1].gt_HistoryKeyTm;
  try {
    const pool = await get("Operations", config);

    const [reportAll, report2, report5] = await Promise.all([
      pool
        .request()
        .query(
          `SELECT ISNULL(SUM(r_Delay.i_Duration/60),0) AS total FROM Operations.dbo.r_Delay WHERE r_Delay.gt_StartTime >= '${startTime}' AND r_Delay.gt_EndTime <= '${endTime}'`
        ),
      pool
        .request()
        .query(
          `SELECT ISNULL(SUM(r_Delay.i_Duration/60),0) AS two FROM Operations.dbo.r_Delay WHERE r_Delay.i_Duration BETWEEN 120 AND 300 AND r_Delay.gt_StartTime >= '${startTime}' AND r_Delay.gt_EndTime <= '${endTime}'`
        ),
      pool
        .request()
        .query(
          `SELECT ISNULL(SUM(r_Delay.i_Duration/60),0) AS five FROM Operations.dbo.r_Delay WHERE r_Delay.i_Duration > 300 AND r_Delay.gt_StartTime >= '${startTime}' AND r_Delay.gt_EndTime <= '${endTime}'`
        )
    ]);

    return {
      total: reportAll.recordset[0].total,
      two: report2.recordset[0].two,
      five: report5.recordset[0].five
    };
  } catch (err) {
    console.error("Error in FmDelay:", err);
  }
};

export const SendData = async (req, res) => {
  try {
    const period = req.body.period;
    let RM = null;
    let RollChange = null;

    const getLastEntries = async (model, limit) =>
      await model.find().sort({ gt_HistoryKeyTm: -1 }).limit(limit);

    const processPeriod = async (Excel, pacing) => {
      if (Excel.length > 0 && pacing.length > 0) {
        RM = await RMThickness(Excel, period);
        RollChange = await FmDelay(Excel);
        return { Excel, pacing, RM, RollChange };
      } else {
        return null;
      }
    };

    if (period === "Last Coil") {
      const Excel = await getLastEntries(ExcelData, 1);
      const pacing = await getLastEntries(PacingData, 1);
      const result = await processPeriod(Excel, pacing);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(202).json("Data not yet in DB");
      }
    } else if (period === "Last 5 Coil") {
      const Excel = await getLastEntries(ExcelData, 5);
      const pacing = await getLastEntries(PacingData, 5);
      const result = await processPeriod(Excel, pacing);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(202).json("Data not yet in DB");
      }
    } else if (period === "Last Hour") {
      const currentDateTime = new Date();
      const oneHourAgo = new Date(
        currentDateTime.getTime() - 60 * 60 * 1000
      ).toISOString();
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: { $gte: oneHourAgo }
      }).sort({ gt_HistoryKeyTm: -1 });
      const pacing = await PacingData.find({
        gt_HistoryKeyTm: { $gte: oneHourAgo }
      }).sort({ gt_HistoryKeyTm: -1 });
      const result = await processPeriod(Excel, pacing);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(202).json("Data not yet in DB");
      }
    } else if (period === "Last Shift") {
      const getShiftTimes = (shiftStart, shiftEnd) => ({
        start: new Date().setHours(...shiftStart, 0, 0).toISOString(),
        end: new Date().setHours(...shiftEnd, 0, 0).toISOString()
      });

      const shiftTimes = [
        getShiftTimes([6, 0], [14, 0]),
        getShiftTimes([14, 0], [22, 0]),
        {
          start: new Date().setHours(22, 0, 0, 0).toISOString(),
          end: new Date().setHours(6, 0, 0, 0).toISOString()
        }
      ];

      for (let { start, end } of shiftTimes) {
        const Excel = await ExcelData.find({
          gt_HistoryKeyTm: { $gte: start, $lte: end }
        });
        const pacing = await PacingData.find({
          gt_HistoryKeyTm: { $gte: start, $lte: end }
        });
        const result = await processPeriod(Excel, pacing);
        if (result) {
          return res.status(200).json(result);
        }
      }
      res.status(400).json("Wait for 1:00");
    } else if (period.customp) {
      const customPieceName = period.customp.replace(/\s+/g, "\\s*");
      const Excel = await ExcelData.findOne({
        c_PieceName: new RegExp(customPieceName)
      });
      const pacing = await PacingData.findOne({
        c_PieceName: new RegExp(customPieceName)
      });
      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      } else {
        res.status(202).json("No ID Match found in DB");
      }
    } else if (period === "Last Day") {
      const oneDayAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: { $gte: oneDayAgo }
      }).sort();
      const pacing = await PacingData.find({
        gt_HistoryKeyTm: { $gte: oneDayAgo }
      }).sort();
      const result = await processPeriod(Excel, pacing);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(202).json("No ID Match found in DB");
      }
    } else if (period.date && period.time) {
      const startDate = new Date(`${period.date[0]} ${period.time[0]}`);
      const endDate = new Date(`${period.date[1]} ${period.time[1]}`);
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: { $gte: startDate, $lte: endDate }
      });
      const pacing = await PacingData.find({
        gt_HistoryKeyTm: { $gte: startDate, $lte: endDate }
      });
      const result = await processPeriod(Excel, pacing);
      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.error("Error in SendData:", error);
    res.status(500).json(error);
  }
};
