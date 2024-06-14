const router = require('express-promise-router')();
const reviewController = require('../controllers/review.controller');

router.post('/reviews', reviewController.createReview);

router.get('/reviews', reviewController.listAllReviews);

router.get('/reviews/:id', reviewController.findReviewById);

router.put('/reviews/:id', reviewController.updateReviewById);

router.delete('/reviews/:id', reviewController.deleteReviewById);

router.get('/product-reviews/:id', reviewController.findProductReviewsById);

module.exports = router;
