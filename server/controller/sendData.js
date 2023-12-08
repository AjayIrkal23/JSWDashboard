import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";

let config = {
  user: "Dashboard", //default is sa
  password: "Dashboard",
  server: "10.11.2.41", // for local machine
  database: "Production", // name of database
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 1800000,
};

const DateJoin = (check) => {
  let date = check.split(" ")[1];
  let month = check.split(" ")[2];
  let year = check.split(" ")[3];

  return date + " " + month + " " + year;
};

export const SendData = async (req, res) => {
  try {
    if (req?.body?.period == "Last Coil") {
      const Excel = await ExcelData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);
      const pacing = await PacingData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);

      if (Excel.length > 0 && pacing.length > 0) {
        res.status(200).json({
          Excel: Excel[Excel.length - 1],
          pacing: pacing[pacing.length - 1],
        });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last 5 Coil") {
      const Excel = await ExcelData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(5);
      const pacing = await PacingData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(5);

      if (Excel.length > 0 && pacing.length > 0) {
        res.status(200).json({
          Excel: Excel,
          pacing: pacing,
        });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last Hour") {
      const currentDateTime = new Date(); // Get the current date and time
      const oneHourAgo = new Date(
        currentDateTime.getTime() - 60 * 60 * 1000
      ).toISOString();

      const pacing = await PacingData.find({
        gt_HistoryKeyTm: { $gte: oneHourAgo },
      }).sort({ gt_HistoryKeyTm: -1 });
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: { $gte: oneHourAgo },
      }).sort({ gt_HistoryKeyTm: -1 });

      if (Excel.length > 0 && pacing.length > 0) {
        res.status(200).json({ Excel: Excel, pacing: pacing });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last Shift") {
      let shift;
      const shift1 = "00:00:00";
      const shift2 = "8:30:00";
      const shift3 = "16:30:00";

      let d = new Date();
      let check = d.toUTCString();
      let dateObj = d.toTimeString().split(" ")[0];
    } else if (req?.body?.period.customp) {
      const customPieceName = req?.body?.period.customp;
      const Excel = await ExcelData.findOne({
        c_PieceName: new RegExp(customPieceName.replace(/\s+/g, "\\s*")),
      });
      const pacing = await PacingData.findOne({
        c_PieceName: new RegExp(customPieceName.replace(/\s+/g, "\\s*")),
      });
      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      } else {
        res.status(202).json("No ID Match found in Db");
      }
    } else if (req?.body?.period == "Last Day") {
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: {
          $gt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      }).sort();

      const pacing = await PacingData.find({
        gt_HistoryKeyTm: {
          $gt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      }).sort();

      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      } else {
        res.status(202).json("No ID Match found in Db");
      }
    } else if (req?.body?.period?.date && req?.body?.period?.time) {
      const startDate = new Date(
        req?.body?.period?.date[0] + " " + req?.body?.period?.time[0]
      );
      const endDate = new Date(
        req?.body?.period?.date[1] + " " + req?.body?.period?.time[1]
      );

      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      const pacing = await PacingData.find({
        gt_HistoryKeyTm: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
