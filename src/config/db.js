const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin123*',
    port: 3306,
    database: 'teacherapp'
});

module.exports = pool.promise();