//dependencies
const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'postgres://postgress:password@localhost.com:5432/urls';

const db = new Sequelize(CONNECTION_STRING);

const User = db.define('users', {
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
});
const Direction = db.define('directions', {
    destination: Sequelize.TEXT,
    hash: Sequelize.TEXT
});

module.exports = { db, User, Direction };