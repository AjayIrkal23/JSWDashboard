import sql from "mssql";
import Data from "../model/allData.js";
import ExcelData from "../model/excel.js";
import PacingData from "../model/pacing.js";
import cron from "node-cron";
import { get } from "../database/pool-manager.js";

const config = {
  user: "sa",
  password: "loloklol",
  server: "localhost",
  trustServerCertificate: true,
  encrypt: false,
  port: 1433,
  requestTimeout: 20000000
};

export const Start = async (req, res) => {
  try {
    const task = cron.schedule(
      "* * * * *",
      async () => {
        console.log("Running a task every minute");
        await GetExcelReport();
        // await CorrectId(); Uncomment if needed
      },
      { scheduled: false }
    );

    task.start();
    res.status(200).json("Started Cron Job");
  } catch (error) {
    console.error("Error starting cron job:", error);
    res.status(500).json(error);
  }
};

export const DumpAll = async (req, res) => {
  console.log("hello");
  try {
    const pool = await get("History", config);
    console.log("Connection Successful !");

    const start = new Date("Oct 2023 1");
    const end = new Date("Oct 2023 29");

    const queries = [
      `SELECT * FROM r_PacingExcelReport WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`,
      `SELECT * FROM r_PacReport2 WHERE gt_HistoryKeyTm >= '${start.toISOString()}' AND gt_HistoryKeyTm <= '${end.toISOString()}'`
    ];

    const [excelReport, pacReport2] = await Promise.all(
      queries.map((query) => pool.request().query(query))
    );

    if (excelReport?.recordset?.length && pacReport2?.recordset?.length) {
      await Promise.all([
        ...excelReport.recordset.map(async (item) => {
          try {
            await ExcelData.create({
              ...item,
              gt_HistoryKeyTm: new Date(item.gt_HistoryKeyTm).toISOString()
            });
            console.log(item.c_PieceName, "done");
          } catch (err) {
            console.error("Error saving ExcelData:", err);
          }
        }),
        ...pacReport2.recordset.map(async (item) => {
          try {
            await PacingData.create({
              ...item,
              gt_HistoryKeyTm: new Date(item.gt_HistoryKeyTm).toISOString()
            });
            console.log(item.c_PieceName, "done");
          } catch (err) {
            console.error("Error saving PacingData:", err);
          }
        })
      ]);

      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (err) {
    console.error("Error in DumpAll:", err);
    res.status(500).json({ message: "Failed", err });
  }
};

export const GetExcelReport = async () => {
  try {
    const pool = await get("History", config);

    const [excelReport, pacReport2] = await Promise.all([
      pool
        .request()
        .query(
          `SELECT TOP (1) * FROM r_PacingExcelReport ORDER BY gt_HistoryKeyTm DESC`
        ),
      pool
        .request()
        .query(
          `SELECT TOP (1) * FROM r_PacReport2 ORDER BY gt_HistoryKeyTm DESC`
        )
    ]);

    if (excelReport.recordset[0] && pacReport2.recordset[0]) {
      const [exists, exists2] = await Promise.all([
        ExcelData.findOne({
          c_PieceName: excelReport.recordset[0].c_PieceName
        }),
        PacingData.findOne({ c_PieceName: pacReport2.recordset[0].c_PieceName })
      ]);

      if (!exists) {
        await ExcelData.create({
          ...excelReport.recordset[0],
          gt_HistoryKeyTm: new Date(
            excelReport.recordset[0].gt_HistoryKeyTm
          ).toISOString()
        })
          .then((resp) => {
            console.log(excelReport.recordset[0].c_PieceName, "done");
          })
          .catch((err) => {
            console.error("Error creating ExcelData:", err);
          });
      }

      if (!exists2) {
        await PacingData.create({
          ...pacReport2.recordset[0],
          gt_HistoryKeyTm: new Date(
            pacReport2.recordset[0].gt_HistoryKeyTm
          ).toISOString()
        })
          .then((resp) => {
            console.log(pacReport2.recordset[0].c_PieceName, "done");
          })
          .catch((err) => {
            console.error("Error creating PacingData:", err);
          });
      }

      console.log("Success!");
    } else {
      console.log("Piece Not Found!");
    }
  } catch (error) {
    console.error("Error in GetExcelReport:", error);
  }
};

export const CorrectId = async () => {
  try {
    const [excel, pacing] = await Promise.all([
      ExcelData.find({}).sort(),
      PacingData.find({}).sort()
    ]);

    await Promise.all([
      ...excel.map(async (item) => {
        if (item.c_PieceName.length > 10) {
          const num = item.c_PieceName.trim();
          const id = item._id.toString();
          await ExcelData.findByIdAndUpdate(id, { c_PieceName: num });
          console.log(item.c_PieceName, "done");
        } else {
          console.log("is Correct");
        }
      }),
      ...pacing.map(async (item) => {
        if (item.c_PieceName.length > 10) {
          const num = item.c_PieceName.trim();
          const id = item._id.toString();
          await PacingData.findByIdAndUpdate(id, { c_PieceName: num });
          console.log(item.c_PieceName, "done");
        } else {
          console.log("is Correct");
        }
      })
    ]);

    console.log("Success Correct ID");
  } catch (error) {
    console.error("Error in CorrectId:", error);
  }
};
