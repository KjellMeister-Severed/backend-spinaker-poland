const express = require('express');
const sql = require('mysql');
const app = express();
const cors = require('cors');
const generators = require('./generators');
const caseManager = require('./case-manager');
const pestelManager = require('./pestel-manager');
const hofstedeManager = require('./hofstede-manager');
const assignmentManager = require('./assignment-manager');
app.use(express.json());
const port = process.env.PORT || 8080; // default port to listen
app.use(cors())

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.status(200).send("yo");
});

app.post('/assignment', (req, res) => {
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

app.get('/hofstede/info', (req, res) => {
    hofstedeManager.getHofstedeInfo((err, _res) => {
        if (err) {
            console.log(err);
            res.status(500).send("");
        } else {
            res.status(200).send(_res)
        }
    })
})

app.get('/pestel/info', (req, res)=> {
    pestelManager.getPestelInfo((err, _res) => {
        if (err) {
            console.log(err);
            res.status(500).send('')
        } else {
            res.status(200).send(_res)
        }
    })
})

app.get('/pestel/values/:id', (req, res) => {
    pestelManager.getPestelValues(req.params.id, (err, _res) => {
        if (err){
            console.log(req.params.id)
            res.status(500).send("")
        } else {
            console.log(req.params.id)
            res.status(200).send(_res)
        }
    })
})

app.get('/hofstede/values/:id', (req, res) => {
    hofstedeManager.getHofstedeValues(req.params.id,(err, _res) => {
        if (err) {
            console.log(req.params.id)
            res.status(500).send("");
        } else {
            console.log(req.params.id)
            res.status(200).send(_res)
        }
    });
})

app.get('/assignment/overview', (req, res) => {
    assignmentManager.getAssignments((results) => {
        console.log(results)
        res.status(200).send(results)
    })
})

app.post('/assignment/submit', (req, res) => {
    assignmentManager.submitAssignment(req.body.access_code, 1, JSON.stringify(req.body.report), (err, _res) => {
        if (err){
            console.log(err)
            res.status(500).send("");
        } else {
            res.status(200).send("OK")
        }
    })
});

app.get('/case', (req, res) => {
    console.log(req.body)
    caseManager.getAllCases((results) => {
        res.status(200).send(results)
    });
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});