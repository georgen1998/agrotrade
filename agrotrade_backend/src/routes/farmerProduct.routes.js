const router = require('express-promise-router')();
const farmerProductController = require('../controllers/farmerProduct.controller');

router.post('/farmerProducts', farmerProductController.createFarmerProduct);

router.get('/farmerProducts', farmerProductController.listAllFarmerProducts);

router.get('/farmerProducts/:id', farmerProductController.findFarmerProductById);

router.get('/productsFarmer/:id', farmerProductController.findProductFarmerById);

router.put('/farmerProducts/:id', farmerProductController.updateFarmerProductById);

router.delete('/farmerProducts/:id', farmerProductController.deleteFarmerProductById);

module.exports = router;
