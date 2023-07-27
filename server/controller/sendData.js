import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";

let config = {
  user: "sa", //default is sa
  password: "loloklol",
  server: "localhost", // for local machine
  database: "History", // name of database
  trustServerCertificate: true,
  requestTimeout: 1800000,
};

const DateJoin = (check) => {
  let date = check.split(" ")[1];
  let month = check.split(" ")[2];
  let year = check.split(" ")[3];

  return date + " " + month + " " + year;
};

export const SendData = async (req, res) => {
  console.log(req.body.period.date && req.body.period.time);
  try {
    if (req?.body?.period == "Last Coil") {
      const Excel = await ExcelData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);
      const pacing = await PacingData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);

      console.log(Excel[Excel.length - 1], pacing[pacing.length - 1]);
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
      console.log(Excel[Excel.length - 1], pacing[pacing.length - 1]);
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
      const oneHourAgo = new Date(currentDateTime.getTime() - 60 * 60 * 1000);

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
      const Excel = await ExcelData.findOne({
        c_PieceName: req?.body?.period.customp,
      });
      const pacing = await PacingData.findOne({
        c_PieceName: req?.body?.period.customp,
      });
      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      } else {
        res.status(202).json("No ID Match found in Db");
      }
    } else if (req?.body?.period == "Last Day") {
      const Excel = await ExcelData.find({
        gt_HistoryKeyTm: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }).sort();

      const pacing = await PacingData.find({
        gt_HistoryKeyTm: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }).sort();

      if (Excel && pacing) {
        res.status(200).json({ Excel, pacing });
      } else {
        res.status(202).json("No ID Match found in Db");
      }
    } else if (req?.body?.period?.date && req?.body?.period?.time) {
      const Excel = await ExcelData.find({
        createdAt: {
          $gte: new Date(
            req?.body?.period?.date[0] + " " + req?.body?.period?.time[0]
          ),
          $lte: new Date(
            req?.body?.period?.date[1] + " " + req?.body?.period?.time[1]
          ),
        },
      });

      const pacing = await PacingData.find({
        createdAt: {
          $gte: new Date(
            req?.body?.period?.date[0] + " " + req?.body?.period?.time[0]
          ),
          $lte: new Date(
            req?.body?.period?.date[1] + " " + req?.body?.period?.time[1]
          ),
        },
      });

      console.log(pacing.length);

      if (Excel && pacing) {
        console.log("hello");
        res.status(200).json({ Excel: Excel, pacing: pacing });
      } else {
        res.status(202).json("No Date Match found in Db");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
