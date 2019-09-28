var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
const mysql = require('mysql')

const db = {}
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
  // port: "3307"

})
con.connect(function (err) { if (err) throw err })

var ConnectDatabase = function (username) {
  // console.log("Connected!");
  let sql = `SELECT username , password FROM user
              WHERE username = "${username}";`
  con.query(sql, function (err, result) {
    if (err) throw err
    db.result = result
    console.log(result)
  })
}

var port = 3000

var app = express()
// app.use(cors())

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/api', tasks)
app.post('/user/:username', (req, res, next) => {
  ConnectDatabase(req.params.username)
  res.send(db.result)
})

app.listen(port, function () {
  console.log('Server started on port ' + port)
})
