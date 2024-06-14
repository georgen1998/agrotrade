const FarmerProduct = require('../models/FarmerProduct');

const ERROR_MESSAGE = 'An error occurred';

exports.createFarmerProduct = async (req, res) => {
    const { body } = req;
    try {
        const newFarmerProduct = await FarmerProduct.create(body);
        res.status(201).send({
            message: 'FarmerProduct added successfully!',
            body: { farmerProduct: newFarmerProduct },
        });
    } catch (error) {
        console.error('createFarmerProduct', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllFarmerProducts = async (req, res) => {
    try {
        const farmerProducts = await FarmerProduct.findAll();
        //console.log('FarmerProducts:', farmerProducts); // Log the farmerProducts
        res.status(200).send(farmerProducts);
    } catch (error) {
        console.error('listAllFarmerProducts', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findFarmerProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const farmerProduct = await FarmerProduct.findAll({ where: { product_id: id, }, });
        console.log(id)
        if (!farmerProduct) {
            throw 'farmerProduct_not_found';
        }
        res.status(200).send(farmerProduct);
    } catch (error) {
        console.error('findFarmerProductById', error);
        if (error === 'farmerProduct_not_found') {
            res.status(404).send({
                message: 'FarmerProduct not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.findProductFarmerById = async (req, res) => {
    const { id } = req.params;
    try {
        const farmerProduct = await FarmerProduct.findAll({ where: { farmer_id: id, }, });
        console.log(id)
        if (!farmerProduct) {
            throw 'farmerProduct_not_found';
        }
        res.status(200).send(farmerProduct);
    } catch (error) {
        console.error('findFarmerProductById', error);
        if (error === 'farmerProduct_not_found') {
            res.status(404).send({
                message: 'FarmerProduct not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateFarmerProductById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await FarmerProduct.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'farmerProduct_not_found';
        }
        res.status(200).send({ message: 'FarmerProduct Updated Successfully!' });
    } catch (error) {
        console.error('updateFarmerProductById', error);
        if (error === 'farmerProduct_not_found') {
            res.status(404).send({
                message: 'FarmerProduct not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFarmerProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await FarmerProduct.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'farmerProduct_not_found';
        }
        res.status(200).send({ message: 'FarmerProduct deleted successfully!' });
    } catch (error) {
        console.error('deleteFarmerProductById', error);
        if (error === 'farmerProduct_not_found') {
            res.status(404).send({
                message: 'FarmerProduct not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
