const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = `SELECT * FROM user;`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      console.log("The Database is created!!");
    });
  });