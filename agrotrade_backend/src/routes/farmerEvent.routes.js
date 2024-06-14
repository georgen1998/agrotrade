const router = require('express-promise-router')();
const farmerEventController = require('../controllers/farmerEvent.controller');

router.post('/farmerEvents', farmerEventController.createFarmerEvent);

router.get('/farmerEvents', farmerEventController.listAllFarmerEvents);

router.get('/farmerEvents/:id', farmerEventController.findFarmerEventById);

router.get('/eventsFarmer/:id', farmerEventController.findEventFarmerById);

router.put('/farmerEvents/:id', farmerEventController.updateFarmerEventById);

router.delete('/farmerEvents/:id', farmerEventController.deleteFarmerEventById);

module.exports = router;
