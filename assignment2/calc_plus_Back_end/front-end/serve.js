// const http = require("http");
// const querystring = require("querystring");
const mysql = require("mysql2");
var resdata=[];
// const serve = http.createServer((req, res) => {
//   // let postVal = "";
//   req.on("data", (chunk) => {
//     // postVal += chunk;
//   });
//   //   req.write(postVal);

//   req.on("end", () => {
//     let formVal = querystring.parse(postVal);
//     let exp = formVal.expression;
//     let res = formVal.result;
//   });
//   res.end();
// });
// serve.listen('http://localhost:8080');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lsq516712",
  database: "calc",
  port: "3306",
});
connection.connect();
function fetchData() {
  return new Promise((resolve, reject) => {
    connection.query('select * from dataform', (error, results, fields) => {
      if (error) {
        connection.end();
        reject(error);
      } else {
        resdata = results;
        // 关闭数据库连接
        connection.end();
        resolve(resdata);
      }
    });
  });
}

module.exports.fetchData = fetchData;
