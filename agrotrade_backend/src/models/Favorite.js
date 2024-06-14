const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    farmer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'favorite',
    timestamps: false,
});

Favorite.sync();

module.exports = Favorite;
