const Favorite = require('../models/Favorite');

const ERROR_MESSAGE = 'An error occurred';

exports.createFavorite = async (req, res) => {
    const { body } = req;
    try {
        const newFavorite = await Favorite.create(body);
        res.status(201).send({
            message: 'Favorite added successfully!',
            body: { favorite: newFavorite },
        });
    } catch (error) {
        console.error('createFavorite', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll();
        res.status(200).send(favorites);
    } catch (error) {
        console.error('listAllFavorites', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findFavoriteById = async (req, res) => {
    const { id } = req.params;
    try {
        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            throw 'favorite_not_found';
        }
        res.status(200).send(favorite);
    } catch (error) {
        console.error('findFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateFavoriteById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Favorite.update(body, { where: { customer_id: id } });
        if (updatedRowsCount === 0) {
            throw 'favorite_not_found';
        }
        res.status(200).send({ message: 'Favorite updated successfully!' });
    } catch (error) {
        console.error('updateFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFavoriteById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Favorite.destroy({ where: { customer_id: id } });
        if (deletedRowCount === 0) {
            throw 'favorite_not_found';
        }
        res.status(200).send({ message: 'Favorite deleted successfully!' });
    } catch (error) {
        console.error('deleteFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFavoriteFarmerById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Favorite.destroy({ where: { farmer_id: id } });
        if (deletedRowCount === 0) {
            throw 'favorite_not_found';
        }
        res.status(200).send({ message: 'Favorite deleted successfully!' });
    } catch (error) {
        console.error('deleteFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFavoriteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Favorite.destroy({ where: { product_id: id } });
        if (deletedRowCount === 0) {
            throw 'favorite_not_found';
        }
        res.status(200).send({ message: 'Favorite deleted successfully!' });
    } catch (error) {
        console.error('deleteFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFavoriteEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Favorite.destroy({ where: { event_id: id } });
        if (deletedRowCount === 0) {
            throw 'favorite_not_found';
        }
        res.status(200).send({ message: 'Favorite deleted successfully!' });
    } catch (error) {
        console.error('deleteFavoriteById', error);
        if (error === 'favorite_not_found') {
            res.status(404).send({
                message: 'Favorite not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
