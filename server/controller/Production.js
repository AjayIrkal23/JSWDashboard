import sql from "mssql";

let config = {
  user: "sa", //default is sa
  password: "loloklol",
  server: "localhost", // for local machine
  database: "Production", // name of database
  trustServerCertificate: true,
  requestTimeout: 1800000,
};

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

export const Check2 = async (req, res) => {
  try {
    sql.connect(config, async (err) => {
      if (err) {
        throw err;
      }
      console.log("Connection Successful !");
      let arr = [];
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const time = "00:00:00";
      const day = 1;
      const dateObj = year + " " + month + " " + day + " " + time;
      var getDaysArray = function (s, e) {
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
            console.log(item, daylist[index + 1]);
            const report = await new sql.Request().query(
              `EXEC spGet_Production_Summary_Stats '${item.toISOString()}','${daylist[
                index + 1
              ].toISOString()}'`
            );
            console.log({ date: item, report: report.recordset[0] });
            arr.push({ date: item, report: report.recordset[0] });
          }
        })
      );

      console.log(arr);
      res.status(200).json({ array: arr });

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

export const Check1 = async (req, res) => {
  try {
    sql.connect(config, async (err) => {
      if (err) {
        throw err;
      }
      console.log("Connection Successful !");
      console.log("wow");
      let arr = [];
      let arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "@" +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      const shift1 = "6:30:00";
      const shift2 = "14:30:00";
      const shift3 = "21:30:00";
      console.log(
        datetime.split("@")[1] > shift1 && datetime.split("@")[1] < shift2
      );
      console.log(
        datetime.split("@")[1],
        shift1,
        datetime.split("@")[1],
        shift2
      );

      if (datetime.split("@")[1] > shift1 && datetime.split("@")[1] < shift2) {
        console.log("shift1");
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const day = new Date().getDate();
        const start = year + " " + month + " " + day + " " + shift1;
        const end = year + " " + month + " " + day + " " + shift2;
        let run = await Promise.all(
          arr1.map(async (item) => {
            let DateStart = new Date(start).toISOString();
            let DateEnd = addHours(DateStart, item);
            console.log(DateStart, DateEnd);
            const report = await new sql.Request()
              .query(
                `EXEC spGet_Production_Summary_Stats '2023-01-27T16:00:00.000Z','2023-02-28T01:00:00.000Z'`
              )
              .then((resp) => {
                arr.push(resp.recordset[0]);
              });
          })
        );
        console.log(arr);
      } else if (
        datetime.split("@")[1] > shift2 &&
        datetime.split("@")[1] < shift3
      ) {
        console.log("shift2");
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const day = new Date().getDate();
        const start = year + " " + month + " " + day + " " + shift2;
        const end = year + " " + month + " " + day + " " + shift3;
        console.log(new Date(start));
        let run = await Promise.all(
          arr1.map(async (item) => {
            let DateStart = new Date(start).toISOString();
            let DateEnd = addHours(DateStart, item);
            console.log(DateStart, DateEnd);
            const report = await new sql.Request()
              .query(
                `EXEC spGet_Production_Summary_Stats '2023-01-27T16:00:00.000Z','2023-02-28T01:00:00.000Z'`
              )
              .then((resp) => {
                arr.push(resp.recordset[0]);
              });
          })
        );
        console.log(arr);
      } else if (
        datetime.split("@")[1] > shift3 &&
        datetime.split("@")[1] < shift1
      ) {
        console.log("shift2");
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const day = new Date().getDate();
        const start = year + " " + month + " " + day + " " + shift3;
        const end = year + " " + month + " " + (day + 1) + " " + shift1;
        let run = await Promise.all(
          arr1.map(async (item) => {
            let DateStart = new Date(start).toISOString();
            let DateEnd = addHours(DateStart, item);
            console.log(DateStart, DateEnd);
            const report = await new sql.Request()
              .query(
                `EXEC spGet_Production_Summary_Stats '2023-01-27T16:00:00.000Z','2023-02-28T01:00:00.000Z'`
              )
              .then((resp) => {
                arr.push(resp.recordset[0]);
              });
          })
        );
        console.log(arr);
      } else {
        res.status(400).json("wait for 1:00");
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
