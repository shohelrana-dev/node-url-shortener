//dependencies
const express = require('express');
const signup = require('./src/controllers/signup');
const login = require('./src/controllers/login');
const auth = require('./src/middlewares/auth');
const errorHandler = require('./src/middlewares/error_handler');

//app instance
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(signup);
app.use(login);
app.use('/api', auth);

app.get('/', (req, res) => {
    res.end('Hello world');
});


app.use(errorHandler);

const _port = process.env.PORT || 4000;
app.listen(_port, () => {
    console.log(`Application listening on port ${_port}`);
});
