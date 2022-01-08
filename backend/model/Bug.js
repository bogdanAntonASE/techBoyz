module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bug', {
        'severity': {
            type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
            required: true
        },
        'priority': {
            type: DataTypes.ENUM('P1', 'P2', 'P3'),
            required: true
        },
        'description': {
            type: DataTypes.STRING,
            required: true
        },
        'commit': {
            type: DataTypes.STRING,
            required: true
        },
        'project_id': {
            type: DataTypes.INTEGER,
            required: true
        },
        'asignee': {
            type: DataTypes.STRING,
            allowNull: true,
            required: false
        },
        'reporter': {
            type: DataTypes.STRING,
            require: true
        }
    }, {
        underscored: true,
        timestamps: false
    })
}