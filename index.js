const express = require('express');
const sql = require('mysql');
const app = express();
const generators = require('./generators');
app.use(express.json());
const port = 8080; // default port to listen
const pool = sql.createPool({
    connectionLimit: 10,
    host: "ID321707_creativeacademy.db.webhosting.be",
    port: 3306,
    database: "ID321707_creativeacademy",
    user: "ID321707_creativeacademy",
    password: "Spinaker12!"
});

// define a route handler for the default home page
app.get( "/", ( req, res ) => {

    res.send();
});

app.post("/class", (req, res) => {
   console.log(req.body);
   res.send(req.body)
})

app.post('/assignment', (req, res) => {
    console.log(req.body.access_title)
    generators.newCase(req.body.access_title, req.body.description, req.body.case_id, (err, _res) => {
        if(err) {
            console.log(err);
            res.status(500);
        }
        else {
            res.status(200).send({accessCode: _res});
        }
    });
});



// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});