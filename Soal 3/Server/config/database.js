let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_todo",
});

connection.connect(function (e) {
  if (!e) {
    console.log(e);
  } else {
    console.log("Connection DB successful");
  }
});

module.exports = connection;
