//dependencies
const Sequelize = require('sequelize');

const db = new Sequelize('nodejs_urls', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
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
    destination: Sequelize.TEXT,
    hash: Sequelize.TEXT
});

User.hasOne(Direction);

db.sync()
    .then(e => console.log('Database synced'))
    .catch(e => console.log(e.message));

module.exports = { db, User, Direction };