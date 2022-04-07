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

const row2report = (row) => {
    if (row.id === null) {
        throw new Error("Interraction could not complete");
    } else{
        return {
            id: row.id,
            access_code: row.access_code,
            case_id: row.case_id,
            report: row.report,
            timestamp: row.timestamp
        }
    }
}

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

const getAssignments = (cb) => {
    const sql = `SELECT * FROM Report`
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if (err) cb(err)
            else {
                cb(res.map(row2report));
            }
        });
    })
}

module.exports = {
    submitAssignment, getAssignments
}