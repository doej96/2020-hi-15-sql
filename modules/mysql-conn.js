const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'eunjeong',
  password: 'dmswjd96',
  database: 'eunjeong'
});

module.exports = { mysql, connection }