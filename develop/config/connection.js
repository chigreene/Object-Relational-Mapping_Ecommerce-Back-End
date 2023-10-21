// enable access to .env variables
require('dotenv').config();

// creates instance of the sequelize class
const Sequelize = require('sequelize');

// allows the application to run in a production environment like Heroku or to run locally using env variables
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = sequelize;
