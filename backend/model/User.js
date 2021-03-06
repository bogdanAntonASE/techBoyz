module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        'username': {
            type: DataTypes.STRING,
            allowNull:false,
            required: true
        },
        'password': {
            type: DataTypes.STRING,
            allowNull:false,
            required: true
        },
        'email': {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        'type': {
            type: DataTypes.ENUM('MP', 'TST', 'REGULAR'),
            required: true
        }
    }, {
        underscored: true,
        timestamps: false
    })
}