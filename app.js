//dependencies
require('dotenv').config()
const express = require("express");
const cors = require('./src/middlewares/cors');
const signup = require('./src/controllers/signup');
const login = require('./src/controllers/login');
const auth = require('./src/middlewares/auth');
const redirects = require('./src/controllers/redirects');
const path = require('path')

//app instance
const app = express();

//middlewares
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', auth);

app.use(express.static(path.resolve('./frontend/build')));

//routes
app.use(signup);
app.use(login);
app.use(redirects);

//run the server
const _port = process.env.APP_PORT || 4000;
app.listen(_port, () => {
    console.log(`Application listening on port ${_port}`);
});
