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

const getHofstedeInfo = (cb) => {
    const sql = `SELECT * FROM Hofstede`
    pool.getConnection(function (err, connection) {
        connection.query(sql, (err, res) => {
            if(err) cb(err);
            else {
                console.log(res)
                cb(err, res.map(row2HofstedeInfo))
            }
        })
    })

}

module.exports = {
    getHofstedeInfo
}