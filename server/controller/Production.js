import sql2 from "mssql";
import { get } from "../database/pool-manager.js";

let config = {
  user: "sa", //default is sa
  password: "loloklol",
  server: "localhost", // for local machine
  database: "Production", // name of database
  trustServerCertificate: true,
  requestTimeout: 1800000,
};

export const Check2 = async (req, res) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful !");
    let arr = [];
    const month =
      new Date().getMonth()`                                                                                                    ````````````````````````````` +
      1;
    const year = new Date().getFullYear();
    const time = "00:00:00";
    const day = 1;
    const dateObj = year + " " + month + " " + day + " " + time;
    const getDaysArray = function (s, e) {
      for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
      ) {
        a.push(new Date(d));
      }
      return a;
    };

    var daylist = getDaysArray(new Date(dateObj), new Date());

    const end = new Date();
    let run = await Promise.all(
      daylist.map(async (item, index) => {
        if (index != daylist.length - 1) {
          const report = await pool
            .request()
            .query(
              `EXEC spGet_Production_Summary_Stats '${item.toISOString()}','${daylist[
                index + 1
              ].toISOString()}'`
            );

          arr.push({ date: item, report: report.recordset[0] });
        }
      })
    );

    res.status(200).json({ array: arr });
  } catch (err) {
    res.status(500).json({ Message: "Failed" });
  }
};

export const Check1 = async (req, res) => {
  try {
    const pool = await get("Production2", config);

    let arr = [];
    let arr1 = [0, 1, 2, 3, 4, 5, 6, 7];

    var currentdate = new Date();

    let datetoday =
      currentdate.getFullYear() +
      " " +
      (currentdate.getMonth() + 1) +
      " " +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();

    let shift1 =
      currentdate.getFullYear() +
      " " +
      (currentdate.getMonth() + 1) +
      " " +
      currentdate.getDate() +
      " " +
      "6:30:00";

    let shift2 =
      currentdate.getFullYear() +
      " " +
      (currentdate.getMonth() + 1) +
      " " +
      currentdate.getDate() +
      " " +
      "14:30:00";

    let shift3 =
      currentdate.getFullYear() +
      " " +
      (currentdate.getMonth() + 1) +
      " " +
      currentdate.getDate() +
      " " +
      "21:30:00";

    let end =
      currentdate.getFullYear() +
      " " +
      (currentdate.getMonth() + 1) +
      " " +
      new Date(new Date().setDate(new Date().getDate() + 1)).getDate();
    " " + "6:30:00";

    if (
      new Date(datetoday).getTime() > new Date(shift1).getTime() &&
      new Date(datetoday).getTime() < new Date(shift2).getTime()
    ) {
      let run = await Promise.all(
        arr1.map(async (item) => {
          let DateStart = new Date(shift1).setHours(
            new Date(shift1).getHours() + item
          );
          let DateEnd = new Date(DateStart).setHours(
            new Date(DateStart).getHours() + 1
          );
          let plus = new Date(DateStart).toISOString();
          let plusOne = new Date(DateEnd).toISOString();

          const report = await pool
            .request()
            .query(`EXEC spGet_Production_Summary_Stats '${plus}','${plusOne}'`)
            .then((resp) => {
              arr.push({
                start: plus,
                end: plusOne,
                data: resp.recordset[0],
              });
            });
        })
      );
      const report = await pool
        .request()
        .query(`EXEC spGet_Production_Summary_Stats '${plus}','${plusOne}'`)
        .then((resp) => {
          arr.push({
            start: plus,
            end: plusOne,
            data: resp.recordset[0],
          });
        });
      new Date(shift1).toISOString();

      res.status(200).json({ arr });
    } else if (
      new Date(datetoday).getTime() > new Date(shift2).getTime() &&
      new Date(datetoday).getTime() < new Date(shift3).getTime()
    ) {
      let run = await Promise.all(
        arr1.map(async (item) => {
          let DateStart = new Date(shift2).setHours(
            new Date(shift2).getHours() + item
          );
          let DateEnd = new Date(DateStart).setHours(
            new Date(DateStart).getHours() + 1
          );
          let plus = new Date(DateStart).toISOString();
          let plusOne = new Date(DateEnd).toISOString();

          const report = await pool
            .request()
            .query(`EXEC spGet_Production_Summary_Stats '${plus}','${plusOne}'`)
            .then((resp) => {
              arr.push({
                start: plus,
                end: plusOne,
                data: resp.recordset[0],
              });
            });
        })
      );

      res.status(200).json({ arr });
    } else if (
      new Date(datetoday).getTime() > new Date(shift3).getTime() &&
      new Date(datetoday).getTime() < new Date(end).getTime()
    ) {
      let run = await Promise.all(
        arr1.map(async (item) => {
          let DateStart = new Date(shift3).setHours(
            new Date(shift3).getHours() + item
          );
          let DateEnd = new Date(DateStart).setHours(
            new Date(DateStart).getHours() + 1
          );
          let plus = new Date(DateStart).toISOString();
          let plusOne = new Date(DateEnd).toISOString();

          const report = await pool
            .request()
            .query(`EXEC spGet_Production_Summary_Stats '${plus}','${plusOne}'`)
            .then((resp) => {
              arr.push({
                start: plus,
                end: plusOne,
                data: resp.recordset[0],
              });
            });
        })
      );
      console.log(arr, "arr");
      res.status(200).json({ arr });
    } else {
      res.status(400).json("wait for 1:00");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
