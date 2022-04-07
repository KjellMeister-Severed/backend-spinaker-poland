"use strict";

const sql = require("mysql");
const pool = sql.createPool({
    connectionLimit: 10,
    host: "ID321707_creativeacademy.db.webhosting.be",
    port: 3306,
    database: "ID321707_creativeacademy",
    user: "ID321707_creativeacademy",
    password: "Spinaker12!"
});


const submitAssignment = (access_code, case_id, report, cb) => {
    const sql = `INSERT INTO Report (access_code, case_id, report, timestamp) VALUES ('${access_code}', 1, '${report}', '${Date.now()}')`;
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if (err) cb(err)
            else {
                cb(err, res)
            }
        })
    })
}

module.exports = {
    submitAssignment
}