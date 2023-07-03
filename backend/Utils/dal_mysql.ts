import mysql from "mysql";
import config from "./Config";

// creating a connection object
// const connection = mysql.createPool({
//   host: config.mySQLhost,
//   user: config.mySQLuser,
//   password: config.mySQLpass,
//   database: config.mySQLdatabase,
// });

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || config.mySQLhost,
  user: process.env.MYSQL_USER || config.mySQLuser,
  password: process.env.MYSQL_PASSWORD || config.mySQLpass,
  database: process.env.MYSQL_DATABASE || config.mySQLdatabase,
});

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    //connection and execute the sql command
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  });
};

export default {
  execute,
};
