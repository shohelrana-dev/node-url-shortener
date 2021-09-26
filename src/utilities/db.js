//dependencies
const Sequelize = require('sequelize');

let database = process.env.DB_DATABASE;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let connection = process.env.DB_CONNECTION;

const db = new Sequelize(database, user, password, {
    host: host,
    dialect: connection,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate()
    .then(() => {
        console.log('Database Connection has been established successfully.');
    })
    .catch(err => console.error('Unable to connect to the database:'));

const User = db.define('users', {
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
});

const Direction = db.define('directions', {
    destination: Sequelize.STRING,
    hash: Sequelize.STRING
});

User.hasOne(Direction);

db.sync()
    .then(e => console.log('Database synced'))
    .catch(e => console.log(e.message));

module.exports = { db, User, Direction };