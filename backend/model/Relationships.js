const { Sequelize } = require('./db.js');
let sequelize = require('./db.js');
const path = require('path');
const User = require(path.join(__dirname, './User'))(sequelize, Sequelize.DataTypes)
const Bug = require(path.join(__dirname, './Bug'))(sequelize, Sequelize.DataTypes)
const Project = require(path.join(__dirname, './Project'))(sequelize, Sequelize.DataTypes)
const ProjectUser = require(path.join(__dirname, './ProjectUser'))(sequelize, Sequelize.DataTypes)

Bug.belongsTo(Project, {onDelete: 'cascade'})
Project.hasMany(Bug, {onDelete: 'cascade'})

Bug.belongsTo(User, {onDelete: 'cascade'})
User.hasMany(Bug, {onDelete: 'cascade'})

User.belongsTo(Project, {onDelete: 'cascade'})
Project.hasMany(User, {onDelete: 'cascade'})

User.belongsTo(ProjectUser, {onDelete: 'cascade'})
ProjectUser.hasMany(User, {onDelete: 'cascade'})

Project.belongsTo(ProjectUser, {onDelete: 'cascade'})
ProjectUser.hasMany(Project, {onDelete: 'cascade'})


module.exports = {
    sequelize,
    User,
    Bug,
    Project,
    ProjectUser
}
