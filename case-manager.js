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

const row2case = (row) => {
    if (row.case_id === null){
        throw new Error("Interaction could not complete")
    } else {
        let test = {
            id: row.case_id,
            description: row.description,
        }
    }
}

const getAllCases = (cb) => {
    const sql = `SELECT * FROM Cases`
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if (err) res.status(500).send("Something went wrong");
            else {
                cb(res.map(row2case));
            }
        })
    })
}

module.exports = {
    getAllCases
}