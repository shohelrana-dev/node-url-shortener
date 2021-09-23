//dependencies
const express = require('express');
const signup = require('./src/controllers/signup');
const login = require('./src/controllers/login');

//app instance
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(signup);
app.use(login);

app.get('/', (req, res) => {
    res.end('Hello world');
});

const _port = process.env.PORT || 4000;
app.listen(_port, () => {
    console.log(`Application listening on port ${_port}`);
});
