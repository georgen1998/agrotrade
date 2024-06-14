const Review = require('../models/Review'); 

const ERROR_MESSAGE = 'An error occurred';

exports.createReview = async (req, res) => {
    const { body } = req;
    try {
        const newReview = await Review.create(body);
        res.status(201).send({
            message: 'Review added successfully!',
            body: { review: newReview },
        });
    } catch (error) {
        console.error('createReview', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        //console.log('Reviews:', reviews); // Log the reviews
        res.status(200).send(reviews);
    } catch (error) {
        console.error('listAllReviews', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.findByPk(id);
        if (!reviews) {
            throw 'reviews_not_found';
        }
        res.status(200).send(reviews);
    } catch (error) {
        console.error('findReviewsById', error);
        if (error === 'reviews_not_found') {
            res.status(404).send({
                message: 'Reviews not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.findProductReviewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.findAll({where: {CustomerId: id}});
        if (!reviews) {
            throw 'reviews_not_found';
        }
        res.status(200).send(reviews);
    } catch (error) {
        console.error('findReviewsById', error);
        if (error === 'reviews_not_found') {
            res.status(404).send({
                message: 'Reviews not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateReviewById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Review.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'review_not_found';
        }
        res.status(200).send({ message: 'Review Updated Successfully!' });
    } catch (error) {
        console.error('updateReviewById', error);
        if (error === 'review_not_found') {
            res.status(404).send({
                message: 'Review not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Review.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'review_not_found';
        }
        res.status(200).send({ message: 'Review deleted successfully!' });
    } catch (error) {
        console.error('deleteReviewById', error);
        if (error === 'review_not_found') {
            res.status(404).send({
                message: 'Review not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
