const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repeat_interval: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'event',
    timestamps: false,
});

Event.sync();

module.exports = Event;
