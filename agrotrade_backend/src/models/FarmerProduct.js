const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const farmerProduct = sequelize.define('farmerProduct', {
    farmer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'farmer_products',
    timestamps: false,
});

farmerProduct.sync();

module.exports = farmerProduct;
