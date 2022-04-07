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

const row2HofstedeInfo = (row) => {
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

const row2HofstedeValues = (row) => {
    if (row.uid === null){
        throw new Error("Interaction could not complete");
    } else {
        return {
            id: row.id,
            country_id: row.country_id,
            score: row.score,
            explanation: row.explanation
        }
    }
}

const getHofstedeInfo = (countryId, cb) => {
    const sql = `SELECT * FROM Hofstede`
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if(err) cb(err);
            else {
                cb(err, res.map(row2HofstedeInfo))
            }
        })
    })
}

const getHofstedeValues = (id, cb) => {
    const sql = `SELECT * FROM CountryHofstede WHERE country_id = '${id}'`
    pool.getConnection(function (err, connection){
        connection.query(sql, (err, res) => {
            if (err) cb(err);
            else {
                cb(err, res.map(row2HofstedeValues))
            }
        })
    })
}

module.exports = {
    getHofstedeInfo, getHofstedeValues
}