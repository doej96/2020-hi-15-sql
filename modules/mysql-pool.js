const mysql = require('mysql2/promise');

const pool = mysql.createPool ({
  host: 'localhost',
  user: 'root',
  password: '000000',
  database: 'eunjeong',
  waitForConnections: true, // 10명 이상의 동접 있으면 대기
  connectionLimit: 10, // 연결풀에 창 10개
  queueLimit: 0
})

module.exports = {mysql, pool}