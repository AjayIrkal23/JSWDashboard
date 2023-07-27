import sql from "mssql";

let config = {
  user: "sa", //default is sa
  password: "loloklol",
  server: "localhost", // for local machine
  database: "Production", // name of database
  trustServerCertificate: true,
};

export const Check2 = async (request, response) => {
  try {
    sql.connect(config, (err) => {
      if (err) {
        throw err;
      }
      console.log("Connection Successful !");

      new sql.Request().query(
        "SELECT TOP (1000) * FROM r_PDI",
        (err, result) => {
          //handle err
          if (err) {
            response.status(500).json(err);
            console.log(err);
          }
          console.dir(result);
          response.status(200).json(result);
          // This example uses callbacks strategy for getting results.
        }
      );
    });

    sql.on("error", (err) => {
      // ... error handler
      response.status(500).json(err);
      console.log("Sql database connection error ", err);
    });
  } catch (error) {
    response.status(500).json(error);
  }
};
