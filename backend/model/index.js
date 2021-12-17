const { Sequelize } = require('./db.js');
let sequelize = require('./db.js');
const path = require('path');
const User = require(path.join(__dirname,'./User'))(sequelize, Sequelize.DataTypes)

module.exports = {
    sequelize,
    User
}