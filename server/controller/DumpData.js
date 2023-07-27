import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import cron from "node-cron";

let config = {
  user: "sa", //default is sa
  password: "loloklol",
  server: "localhost", // for local machine
  database: "History", // name of database
  trustServerCertificate: true,
  requestTimeout: 1800000,
};

export const Start = async (req, res) => {
  try {
    var task = cron.schedule(
      "* * * * *",
      () => {
        console.log("running a task every minute");
        GetExcelReport();
        CorrectId();
      },
      {
        scheduled: false,
      }
    );

    task.start();

    res.status(200).json("Started Cron Job");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const DumpAll = async (req, res) => {
  try {
    sql.connect(config, async (err) => {
      if (err) {
        throw err;
      }
      console.log("Connection Successful !");

      const start = new Date("Jan 2023 1");
      const end = new Date("Feb 2023 1");

      const excelReport = await new sql.Request().query(
        `SELECT * 
        FROM r_PacingExcelReport
        WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
      );
      const pacReport2 = await new sql.Request().query(
        `SELECT * 
        FROM r_PacReport2
        WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
      );

      console.log(excelReport, pacReport2);

      if (
        excelReport?.recordset?.length > 0 &&
        pacReport2?.recordset?.length > 0
      ) {
        excelReport?.recordset?.map(async (item) => {
          await ExcelData.create(item)
            .then((resp) => {
              console.log(item.c_PieceName, "done");
            })
            .catch((err) => {
              console.log(err);
            });
        });

        pacReport2?.recordset?.map(async (item) => {
          await PacingData.create(item)
            .then((resp) => {
              console.log(item.c_PieceName, "done");
            })
            .catch((err) => {
              console.log(err);
            });
        });
        res.status(200).json({ message: "success", pacReport2, excelReport });
      }
      sql.on("error", (err) => {
        // ... error handler
        // res.status(500).json(err);
        console.log("Sql database connection error ", err);
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetExcelReport = () => {
  try {
    sql.connect(config, async (err) => {
      if (err) {
        throw err;
      }
      console.log("Connection Successful !");

      const excelReport = await new sql.Request().query(
        `SELECT TOP (1) * FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
      );
      const pacReport2 = await new sql.Request().query(
        `SELECT TOP (1) * FROM r_PacReport2 ORDER BY gt_HistoryKeyTm DESC`
      );

      console.log(excelReport, pacReport2);

      if (excelReport.recordset[0] && pacReport2.recordset[0]) {
        console.log("Excel :", excelReport.recordset[0]);

        console.log("Pacing :", pacReport2.recordset[0]);

        await ExcelData.create(excelReport.recordset[0]);
        await PacingData.create(pacReport2.recordset[0]);
        // res.status(200).json("Success !");
        console.log("Success !");
      } else {
        // res.status(200).json("Piece Not Found !");
        console.log("Piece Not Found !");
      }
    });

    sql.on("error", (err) => {
      // ... error handler
      // res.status(500).json(err);
      console.log("Sql database connection error ", err);
    });
  } catch (error) {
    // res.status(500).json(error);
    console.log("is Correct");
  }
};

export const CorrectId = async () => {
  try {
    const Excel = await ExcelData.find({}).sort();
    const pacing = await PacingData.find({}).sort();
    Excel.map(async (item) => {
      if (item.c_PieceName.length > 10) {
        let num = item.c_PieceName.replace(/^\s+|\s+$/g, "");
        console.log(item._id, num.length, num);
        let id = item._id.toString();
        ExcelData.findByIdAndUpdate(id, { c_PieceName: num }).then((item) => {
          console.log(item.c_PieceName, "done");
        });
      } else {
        console.log("is Correct");
      }
    });

    pacing.map(async (item) => {
      if (item.c_PieceName.length > 10) {
        let num = item.c_PieceName.replace(/^\s+|\s+$/g, "");
        console.log(item._id, num.length, num);
        let id = item._id.toString();
        PacingData.findByIdAndUpdate(id, { c_PieceName: num }).then((item) => {
          console.log(item.c_PieceName, "done");
        });
      } else {
        console.log("is Correct");
      }
    });
    console.log("Success");
    // res.status(200).json("success");
  } catch (error) {
    console.log(error);
    // res.status(500).json(error);
  }
};
