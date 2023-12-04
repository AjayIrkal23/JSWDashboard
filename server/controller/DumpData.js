import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import cron from "node-cron";
import { get } from "../database/pool-manager.js";

let config = {
  user: "Dashboard", //default is sa
  password: "Dashboard",
  server: "10.11.2.41", // for local machine
  database: "History", // name of database
  trustServerCertificate: true,
  encrypt:false,
  port:1433,
  requestTimeout: 20000000,
};

export const Start = async (req, res) => {
  try {
    var task = cron.schedule(
      "* * * * *",
      () => {
        console.log("running a task every minute");
        GetExcelReport();
        // CorrectId();
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
  console.log("hello")
  try {
    const pool = await get("History", config)
    console.log(pool)
    console.log("Connection Successful !");
    const start = new Date("Oct 2023 1");
    const end = new Date("Oct 2023 29");
    const excelReport = await pool.request().query(
      `SELECT * 
        FROM r_PacingExcelReport
        WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
    );
    const pacReport2 = await pool.request().query(
      `SELECT * 
        FROM r_PacReport2
        WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
    );

    if (excelReport?.recordset?.length && pacReport2?.recordset?.length) {
      excelReport?.recordset?.map(async (item) => {
        await ExcelData.create({
          ...item,
          gt_HistoryKeyTm: new Date(item.gt_HistoryKeyTm).toISOString(),
        })
          .then((resp) => {
            console.log(item.c_PieceName, "done");
          })
          .catch((err) => {
            console.log(err);
          });
      });

      pacReport2?.recordset?.map(async (item) => {
        await PacingData.create({
          ...item,
          gt_HistoryKeyTm: new Date(item.gt_HistoryKeyTm).toISOString(),
        })
          .then((resp) => {
            console.log(item.c_PieceName, "done");
          })
          .catch((err) => {
            console.log(err);
          });
      });
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed",err:err });
  }
};

export const GetExcelReport = async () => {
  const pool = await get("History", config);
  console.log(pool)

  const excelReport = await pool
    .request()
    .query(
      `SELECT TOP (1) * FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
    );

  const pacReport2 = await pool
    .request()
    .query(`SELECT TOP (1) * FROM r_PacReport2 ORDER BY gt_HistoryKeyTm DESC`);

    console.log(excelReport)
    console.log(pacReport2)

  if (excelReport.recordset[0] && pacReport2.recordset[0]) {
    let exists = await ExcelData.findOne({c_PieceName:excelReport.recordset[0].c_PieceName})
    let exists2 = await PacingData.findOne({c_PieceName:pacReport2.recordset[0].c_PieceName})
    console.log("c_PieceName",excelReport.recordset[0].c_PieceName,exists)
    console.log("c_PieceName",pacReport2.recordset[0].c_PieceName,exists2)
    if(!exists && !exists2){
      await ExcelData?.create({
        ...excelReport.recordset[0],
        gt_HistoryKeyTm: new Date(
          excelReport.recordset[0].gt_HistoryKeyTm
        ).toISOString(),
      }).then((resp) => {
        console.log(item.c_PieceName, "done");
      })
      .catch((err) => {
        return
      });

      await PacingData.create({
        ...pacReport2.recordset[0],
        gt_HistoryKeyTm: new Date(
          pacReport2.recordset[0].gt_HistoryKeyTm
        ).toISOString(),
      }).then((resp) => {
        console.log(item.c_PieceName, "done");
      })
      .catch((err) => {
        return
      });
    }
   
    
    // res.status(200).json("Success !");
    console.log("Success !");
  } else {
    // res.status(200).json("Piece Not Found !");
    console.log("Piece Not Found !");
  }
};

// export const GetExcelReport2 = () => {
//   try {
//     sql.connect(config, async (err) => {
//       if (err) {
//         throw err;
//       }
//       console.log("Connection Successful !");

//       const excelReport = await new sql.Request().query(
//         `SELECT TOP (1) * FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
//       );
//       const pacReport2 = await new sql.Request().query(
//         `SELECT TOP (1) * FROM r_PacReport2 ORDER BY gt_HistoryKeyTm DESC`
//       );
//     });

//     sql.on("error", (err) => {
//       // ... error handler
//       // res.status(500).json(err);
//       console.log("Sql database connection error ", err);
//     });
//   } catch (error) {
//     // res.status(500).json(error);
//     console.log("is Correct");
//   }
// };

export const CorrectId = async () => {
  try {
    const Excel = await ExcelData.find({}).sort();
    const pacing = await PacingData.find({}).sort();
    Excel.map(async (item) => {
      if (item.c_PieceName.length > 10) {
        let num = item.c_PieceName.replace(/^\s+|\s+$/g, "");

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

        let id = item._id.toString();
        PacingData.findByIdAndUpdate(id, { c_PieceName: num }).then(
          (item) => {}
        );
      } else {
      }
    });
    console.log("Success Correct ID");
    // res.status(200).json("success");
  } catch (error) {
    console.log(error);
    // res.status(500).json(error);
  }
};
