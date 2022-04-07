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

const row2PestelValues = (row) => {
    if (row.id === null){
        throw new Error("Interaction could not complete");
    }
    else {
        return {
            id: row.id,
            country_id: row.country_id,
            score: row.score,
            explanation: row.explanation
        }
    }
}

const row2PestelInfo = (row) => {
    if (row.id === null){
        throw new Error("Interaction could not complete");
    } else {
        return {
            id: row.id,
            term: row.term,
            description: row.description
        }
    }
}

const getPestelInfo = (cb) => {
    const sql = `SELECT * FROM Pestel`;
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if (err) cb(err)
            else {cb(err, res.map(row2PestelInfo))}
        })
    })
}

const getPestelValues = (id, cb) => {
    const sql = `SELECT * FROM CountryPestel WHERE country_id = '${id}'`;
    pool.getConnection(function (err, connection){
        connection.query(sql, (err, res) => {
            if (err) cb(err);
            else {
                cb(err, res.map(row2PestelValues))
            }
        })
    })
}

module.exports = {
    getPestelInfo, getPestelValues
}
