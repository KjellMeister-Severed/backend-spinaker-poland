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

const newCase = (identifier, description, case_id, cb) => {
    const sql = `SELECT * FROM CaseAssignments`
    pool.getConnection(function (err, connection) {
        if (err) res.status(500);
        else {
            connection.query(sql, (err, result) => {
                if (err) console.log(err);
                else {
                    const insert = `INSERT INTO CaseAssignments (access_code, case_id, description) VALUES ('${"SEG" +  "-" + identifier + "-" + (result.length + 1)}', '${case_id}', '${description}')`
                    connection.query(insert, (err, _res) => {
                        cb(err, `${"SEG" +  "-" + identifier + "-" + result.length}`)
                    })
                }
            })
        }
    });
}

module.exports = {
    newCase
}