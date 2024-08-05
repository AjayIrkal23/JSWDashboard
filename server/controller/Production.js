import sql2 from "mssql";
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

const getDaysArray = (start, end) => {
  const arr = [];
  for (
    let d = new Date(start);
    d <= new Date(end);
    d.setDate(d.getDate() + 1)
  ) {
    arr.push(new Date(d));
  }
  return arr;
};

export const Check2 = async (req, res) => {
  try {
    const pool = await get("Production", config);
    console.log("Connection Successful!");

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const dateObj = new Date(`${year}-${month}-01T00:00:00`);
    const daylist = getDaysArray(dateObj, new Date());
    const arr = [];

    await Promise.all(
      daylist.slice(0, -1).map(async (item, index) => {
        const report = await pool
          .request()
          .query(
            `EXEC spGet_Production_Summary_Stats '${item.toISOString()}', '${daylist[
              index + 1
            ].toISOString()}'`
          );
        arr.push({ date: item, report: report.recordset[0] });
      })
    );

    res.status(200).json({ array: arr });
  } catch (err) {
    console.error("Error in Check2:", err);
    res.status(500).json({ message: "Failed", error: err });
  }
};

export const Check1 = async (req, res) => {
  try {
    const pool = await get("Production2", config);
    const arr = [];
    const arr1 = Array.from({ length: 8 }, (_, i) => i);

    const currentdate = new Date();
    const formatDateTime = (date) =>
      `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

    const shifts = [
      `${currentdate.getFullYear()}-${
        currentdate.getMonth() + 1
      }-${currentdate.getDate()} 06:30:00`,
      `${currentdate.getFullYear()}-${
        currentdate.getMonth() + 1
      }-${currentdate.getDate()} 14:30:00`,
      `${currentdate.getFullYear()}-${
        currentdate.getMonth() + 1
      }-${currentdate.getDate()} 21:30:00`,
      `${currentdate.getFullYear()}-${currentdate.getMonth() + 1}-${new Date(
        currentdate.setDate(currentdate.getDate() + 1)
      ).getDate()} 06:30:00`
    ];

    const [shift1, shift2, shift3, end] = shifts.map((shift) =>
      new Date(shift).getTime()
    );
    const datetoday = new Date(formatDateTime(currentdate)).getTime();

    const runQuery = async (shift) => {
      await Promise.all(
        arr1.map(async (item) => {
          const DateStart = new Date(shift).setHours(
            new Date(shift).getHours() + item
          );
          const DateEnd = new Date(DateStart).setHours(
            new Date(DateStart).getHours() + 1
          );
          const plus = new Date(DateStart).toISOString();
          const plusOne = new Date(DateEnd).toISOString();

          const report = await pool
            .request()
            .query(
              `EXEC spGet_Production_Summary_Stats '${plus}', '${plusOne}'`
            );

          arr.push({ start: plus, end: plusOne, data: report.recordset[0] });
        })
      );
    };

    if (datetoday > shift1 && datetoday < shift2) {
      await runQuery(shift1);
    } else if (datetoday > shift2 && datetoday < shift3) {
      await runQuery(shift2);
    } else if (datetoday > shift3 && datetoday < end) {
      await runQuery(shift3);
    } else {
      res.status(400).json("Wait for 1:00");
      return;
    }

    res.status(200).json({ arr });
  } catch (error) {
    console.error("Error in Check1:", error);
    res.status(500).json({ error });
  }
};
