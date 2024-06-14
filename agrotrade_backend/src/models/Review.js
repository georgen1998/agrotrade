const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    farmer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'review',
    timestamps: false,
});

Review.sync();

module.exports = Review;
