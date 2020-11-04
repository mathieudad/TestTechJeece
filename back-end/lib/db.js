var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'test_tech',
  host: "localhost",
  user: "root",
  password: "rootroot"
});
 
conn.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn
