//dependencies
const express = require("express");
const signup = require('./src/controllers/signup');
const login = require('./src/controllers/login');
const auth = require('./src/middlewares/auth');
const redirects = require('./src/controllers/redirects');
const cors = require('./src/middlewares/cors');

//app instance
const app = express();

//middlewares
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', auth);

//routes
app.use(signup);
app.use(login);
app.use(redirects);

const _port = process.env.PORT || 4000;
app.listen(_port, () => {
    console.log(`Application listening on port ${_port}`);
});
