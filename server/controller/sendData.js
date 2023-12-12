import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import { get } from "../database/pool-manager.js";

let config = {
  user: "sa",
  password: "loloklol",
  server: "localhost",
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

export const RMThickness = async (excel, period) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful !");

    if (period == "Last Coil") {
      let p = excel?.c_PieceName;
      let r = null;
      const report = await pool
        .request()
        .query(
          `SELECT [c_PieceName], [f_R2StripThk]
    FROM [History].[dbo].[r_RMSetup]
    WHERE [c_PieceName] = '218444071'
    ORDER BY [c_PieceName];`
        )
        .then((resp) => {
          r = resp.recordset;
        });

      return r;
    } else {
      let r = null;
      let start = excel[0]?.c_PieceName;
      let end = excel[excel.length - 1]?.c_PieceName;

      const report = await pool
        .request()
        .query(
          `SELECT [c_PieceName], [f_R2StripThk]
        FROM [History].[dbo].[r_RMSetup]
      WHERE [c_PieceName] BETWEEN '218444071' AND '218444078'
      ORDER BY [c_PieceName];`
        )
        .then((resp) => {
          r = resp.recordset;
        });
      return r;
    }
  } catch (err) {
    console.log(err);
  }
};

export const FmDelay = async (excel) => {
  let startTime = excel[0].gt_HistoryKeyTm;
  let endTime = excel[excel.length - 1].gt_HistoryKeyTm;
  try {
    const pool = await get("Operations", config);
    const pool1 = await get("Operations", config);
    const pool3 = await get("Operations", config);

    const reportAll = await pool3.request().query(
      `    SELECT ISNULL(SUM(r_Delay.i_Duration/60),0)
      FROM Operations.dbo.r_Delay r_Delay
      WHERE (r_Delay.gt_StartTime>='2022-06-25 04:11:40.000') AND (r_Delay.gt_EndTime<='2022-07-2 12:14:36.000')`
    );
    console.log(reportAll);
    const report2 = await pool1.request().query(
      `SELECT ISNULL(SUM(r_Delay.i_Duration/60),0)
      FROM Operations.dbo.r_Delay r_Delay
      WHERE (r_Delay.i_Duration>=120 And r_Delay.i_Duration<=300) AND  (r_Delay.gt_StartTime>='2022-06-25 04:11:40.000') AND (r_Delay.gt_EndTime<='2022-07-2 12:14:36.000')`
    );

    const report5 = await pool.request().query(
      `SELECT ISNULL(SUM(r_Delay.i_Duration/60),0)
      FROM Operations.dbo.r_Delay r_Delay
      WHERE (r_Delay.i_Duration>300) AND  (r_Delay.gt_StartTime>='2022-06-25 04:11:40.000') AND (r_Delay.gt_EndTime<='2022-07-2 12:14:36.000')`
    );

    if ((reportAll.recordset[0], report2.recordset[0], report5.recordset[0])) {
      return {
        total: reportAll.recordset[0][""],
        two: report2.recordset[0][""],
        five: report5.recordset[0][""],
      };
    }
  } catch (err) {
    console.log({ Message: "Failed", err: err });
  }
};

export const SendData = async (req, res) => {
  try {
    if (req?.body?.period == "Last Coil") {
      let RM = null;
      const Excel = await ExcelData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);
      const pacing = await PacingData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(1);

      if (Excel.length > 0 && pacing.length > 0) {
        let RmThickness = await RMThickness(
          Excel[Excel.length - 1],
          req?.body?.period
        ).then((resp) => {
          RM = resp;
        });

        res.status(200).json({
          Excel: Excel[Excel.length - 1],
          pacing: pacing[pacing.length - 1],
          RM: RM,
        });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last 5 Coil") {
      let RM = null;
      let RollChange = null;
      const Excel = await ExcelData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(5);
      const pacing = await PacingData.find()
        .sort({ gt_HistoryKeyTm: -1 })
        .limit(5);

      if (Excel.length > 0 && pacing.length > 0) {
        let RmThickness = await RMThickness(Excel, req?.body?.period).then(
          (resp) => {
            console.log(resp);
            RM = resp;
          }
        );
        let FMRollChange = await FmDelay(Excel).then((resp) => {
          console.log(resp);
          RollChange = resp;
        });

        res.status(200).json({
          Excel: Excel,
          pacing: pacing,
          RM: RM,
          RollChange: RollChange,
        });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last Hour") {
      let RM = null;
      let RollChange = null;
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
        let RmThickness = await RMThickness(Excel, req?.body?.period).then(
          (resp) => {
            console.log(resp);
            RM = resp;
          }
        );
        let FMRollChange = await FmDelay(Excel).then((resp) => {
          console.log(resp);
          RollChange = resp;
        });
        res.status(200).json({
          Excel: Excel,
          pacing: pacing,
          RM: RM,
          RollChange: RollChange,
        });
      } else {
        res.status(202).json("data not yet in DB");
      }
    } else if (req?.body?.period == "Last Shift") {
      console.log("Last Shift");
      let shift;
      const shift1Start = new Date().setHours(6, 0, 0, 0);
      const shift1End = new Date().setHours(14, 0, 0, 0);
      const shift2Start = new Date().setHours(14, 0, 0, 0);
      const shift2End = new Date().setHours(22, 0, 0, 0);
      const shift3Start = new Date().setHours(22, 0, 0, 0);
      const shift3End = new Date();
      shift3End.setDate(shift3End.getDate() + 1); // Set to the next day
      shift3End.setHours(6, 0, 0, 0);
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });

      if (
        currentTime >= shift1Start.toLocaleTimeString() &&
        currentTime < shift1End.toLocaleTimeString()
      ) {
        let RM = null;
        let RollChange = null;

        const Excel = await ExcelData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift3Start).toISOString(),
            $lte: new Date(shift3End).toISOString(),
          },
        });

        const pacing = await PacingData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift3Start).toISOString(),
            $lte: new Date(shift3End).toISOString(),
          },
        });

        if (Excel && pacing) {
          let RmThickness = await RMThickness(Excel, req?.body?.period).then(
            (resp) => {
              console.log(resp);
              RM = resp;
            }
          );
          let FMRollChange = await FmDelay(Excel).then((resp) => {
            console.log(resp);
            RollChange = resp;
          });
          res.status(200).json({
            Excel: Excel,
            pacing: pacing,
            RM: RM,
            RollChange: RollChange,
          });
        }
      } else if (
        currentTime >= shift2Start.toLocaleTimeString() &&
        currentTime < shift2End.toLocaleTimeString()
      ) {
        console.log("2");
        let RM = null;
        let RollChange = null;
        const Excel = await ExcelData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift1Start).toISOString(),
            $lte: new Date(shift1End).toISOString(),
          },
        });

        const pacing = await PacingData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift1Start).toISOString(),
            $lte: new Date(shift1End).toISOString(),
          },
        });

        if (Excel && pacing) {
          let RmThickness = await RMThickness(Excel, req?.body?.period).then(
            (resp) => {
              console.log(resp);
              RM = resp;
            }
          );
          let FMRollChange = await FmDelay(Excel).then((resp) => {
            console.log(resp);
            RollChange = resp;
          });
          res.status(200).json({
            Excel: Excel,
            pacing: pacing,
            RM: RM,
            RollChange: RollChange,
          });
        }
      } else if (
        currentTime >= shift2Start.toLocaleTimeString() &&
        currentTime < shift2End.toLocaleTimeString()
      ) {
        console.log("3");
        let RM = null;
        let RollChange = null;
        const Excel = await ExcelData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift2Start).toISOString(),
            $lte: new Date(shift2End).toISOString(),
          },
        });

        const pacing = await PacingData.find({
          gt_HistoryKeyTm: {
            $gte: new Date(shift2Start).toISOString(),
            $lte: new Date(shift2End).toISOString(),
          },
        });

        if (Excel && pacing) {
          let RmThickness = await RMThickness(Excel, req?.body?.period).then(
            (resp) => {
              console.log(resp);
              RM = resp;
            }
          );
          let FMRollChange = await FmDelay(Excel).then((resp) => {
            console.log(resp);
            RollChange = resp;
          });
          res.status(200).json({
            Excel: Excel,
            pacing: pacing,
            RM: RM,
            RollChange: RollChange,
          });
        }
      }
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
      let RM = null;
      let RollChange = null;
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
        let RmThickness = await RMThickness(Excel, req?.body?.period).then(
          (resp) => {
            console.log(resp);
            RM = resp;
          }
        );
        let FMRollChange = await FmDelay(Excel).then((resp) => {
          console.log(resp);
          RollChange = resp;
        });
        res.status(200).json({
          Excel: Excel,
          pacing: pacing,
          RM: RM,
          FMRollChange: FMRollChange,
        });
      } else {
        res.status(202).json("No ID Match found in Db");
      }
    } else if (req?.body?.period?.date && req?.body?.period?.time) {
      let RM = null;
      let RollChange = null;
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
        let RmThickness = await RMThickness(Excel, req?.body?.period).then(
          (resp) => {
            console.log(resp);
            RM = resp;
          }
        );
        let FMRollChange = await FmDelay(Excel).then((resp) => {
          console.log(resp);
          RollChange = resp;
        });
        res.status(200).json({
          Excel: Excel,
          pacing: pacing,
          RM: RM,
          RollChange: RollChange,
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
