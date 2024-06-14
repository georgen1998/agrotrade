const router = require('express-promise-router')();
const favoriteController = require('../controllers/favorite.controller');

router.post('/favorites', favoriteController.createFavorite);
router.get('/favorites', favoriteController.listAllFavorites);
router.get('/favorites/:id', favoriteController.findFavoriteById);
router.put('/favorites/:id', favoriteController.updateFavoriteById);
router.delete('/favorites/:id', favoriteController.deleteFavoriteById);
router.delete('/favoritesFarmer/:id', favoriteController.deleteFavoriteFarmerById);
router.delete('/favoritesProduct/:id', favoriteController.deleteFavoriteProductById);
router.delete('/favoritesEvent/:id', favoriteController.deleteFavoriteEventById);

module.exports = router;