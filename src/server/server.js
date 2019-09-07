const mysql = require('mysql');

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
  });
console.log(con)
var ConnectDatabase = function(con) {
  
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
}
ConnectDatabase(con);
var a = function(){
  console.log("enter a")
}
  module.exports = ConnectDatabase;
  // module.exports = a;