module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project_user', {
        'project_id': {
            type: DataTypes.INTEGER,
            allowNull:false,
            required: true
        },
        'email': {
            type: DataTypes.STRING,
            allowNull:false,
            required: true
        }
    }, {
        underscored: true,
        timestamps: false
    })
}