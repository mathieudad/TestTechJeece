var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'testtech',
  host: "localhost",
  user: "root",
  password: ""
});
 
conn.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn
