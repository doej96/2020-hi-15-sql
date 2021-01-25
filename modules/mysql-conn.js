const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '000000',
  database: 'eunjeong'
});


module.exports = { mysql, connection }