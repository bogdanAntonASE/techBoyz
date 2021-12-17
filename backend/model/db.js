const { Sequelize } = require('sequelize');
let config = require('../config/config.sample.json');

const sequelize = new Sequelize(
    'bugTracking', 
    config.db_user , 
    config.db_pass,
    {
    host: config.host,
    dialect: 'mysql'
    }
);

module.exports = sequelize;