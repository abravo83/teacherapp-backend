const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin123*',
    port: 3306,
    database: 'teacherapp'
});

module.exports = pool.promise();