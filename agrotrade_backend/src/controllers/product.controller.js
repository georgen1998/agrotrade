const Product = require('../models/Product'); 

const ERROR_MESSAGE = 'An error occurred';

exports.createProduct = async (req, res) => {
    const { body } = req;
    try {
        const newProduct = await Product.create(body);
        res.status(201).send({
            message: 'Product added successfully!',
            body: { product: newProduct },
        });
    } catch (error) {
        console.error('createProduct', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        //console.log('Products:', products); // Log the products
        res.status(200).send(products);
    } catch (error) {
        console.error('listAllProducts', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw 'product_not_found';
        }
        res.status(200).send(product);
    } catch (error) {
        console.error('findProductById', error);
        if (error === 'product_not_found') {
            res.status(404).send({
                message: 'Product not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Product.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'product_not_found';
        }
        res.status(200).send({ message: 'Product Updated Successfully!' });
    } catch (error) {
        console.error('updateProductById', error);
        if (error === 'product_not_found') {
            res.status(404).send({
                message: 'Product not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Product.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'product_not_found';
        }
        res.status(200).send({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error('deleteProductById', error);
        if (error === 'product_not_found') {
            res.status(404).send({
                message: 'Product not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
