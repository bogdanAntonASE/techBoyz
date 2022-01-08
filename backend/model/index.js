const { Sequelize } = require('./db.js');
let sequelize = require('./db.js');
const path = require('path');
const User = require(path.join(__dirname,'./User'))(sequelize, Sequelize.DataTypes);
const Bug = require(path.join(__dirname,'./Bug'))(sequelize, Sequelize.DataTypes);
const Project = require(path.join(__dirname,'./Project'))(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    User,
    Bug,
    Project
}