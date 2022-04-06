const express = require('express');
const sql = require('mysql');
const app = express();
const port = 8080; // default port to listen
const pool = sql.createPool({
    connectionLimit: 10,
    host: "s41.zenbox.pl",
    port: 3306,
    database: "ecoonomy_go22",
    user: "ecoonomy_gopr",
    password: "0hilFUj97W"
})


// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
});

app.get('/generate', (req, res) => {
    pool.getConnection(function (err, connection) {
        console.log(err)
    })
    res.send("generate")
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});