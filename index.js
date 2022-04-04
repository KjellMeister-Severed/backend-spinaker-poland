const http = require('http');
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    res.status(404);
})
  

app.get('/ping', (req, res) => {
  res.send('Pong!');
})

app.post('/submit', (req, res) => {
    res.send({
        message: 'submission well received',
        body: req.body
    });
});

app.listen(port, () => {
  console.log(`Spinaker Backend listening on port ${port}`)
});