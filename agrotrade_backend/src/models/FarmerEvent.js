const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const farmerEvent = sequelize.define('farmerEvent', {
    farmer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'farmer_events',
    timestamps: false,
});

farmerEvent.sync();

module.exports = farmerEvent;
