module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project', {
        'name': {
            type: DataTypes.STRING,
            allowNull:false,
            required: true
        },
        'owner': {
            type: DataTypes.STRING,
            allowNull: false,
            require: true
        },
        'url': {
            type: DataTypes.STRING,
            allowNull:false,
            required: true
        }
    }, {
        underscored: true,
        timestamps: false
    })
}