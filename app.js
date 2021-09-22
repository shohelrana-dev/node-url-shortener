//dependencies
const express = require('express');
const bodyParser = require('body-parser');

//app instance
const app = express();

app.get('/', (req, res) => {
    res.end('Hello world');
});

const _port = process.env.PORT || 4000;
app.listen(_port, () => {
    console.log(`Application listening on port ${_port}`);
});


