const mysql = require('mysql');

const db = {}
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    // port: "3307"
    
  });
console.log(con)
var ConnectDatabase = function(con) {
  
  con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
    let sql = `SELECT * FROM user;`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      db.result = result
      // console.log(result);
      // console.log("The Database is created!!");
    });
  });
}
ConnectDatabase(con);
db.mysql = mysql;
db.con = con;
db.connect = ConnectDatabase
module.exports = db;
  // module.exports = a;

// var express = require('express')
// var router = express.Router()

// // Get All Tasks
// router.get('/user', (req, res, next) => {
//     let sql = `SELECT * FROM user;`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//     });
// })

// router.post('/user', (req, res, next) => {
//   if (!req.body.task_name) {
//     res.status(400)
//     res.json({
//       error: 'Bad Data'
//     })
//   } else {
//     Task.create(req.body)
//       .then(() => {
//         res.send('Task Added!')
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       })
//   }
// })

// router.delete('/user/:id', (req, res, next) => {
//   Task.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(() => {
//       res.send('Task deleted!')
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })

// // Update Task
// router.put('/task/:id', (req, res, next) => {
//   if (!req.body.task_name) {
//     res.status(400)
//     res.json({
//       error: 'Bad Data'
//     })
//   } else {
//     Task.update(
//       { task_name: req.body.task_name },
//       { where: { id: req.params.id } }
//     )
//       .then(() => {
//         res.send('Task Updated!')
//       })
//       .error(err => handleError(err))
//   }
// })

// module.exports = router