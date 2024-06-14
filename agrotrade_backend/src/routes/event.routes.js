const router = require('express-promise-router')();
const eventController = require('../controllers/event.controller');

router.post('/events', eventController.createEvent);

router.get('/events', eventController.listAllEvents);

router.get('/events/:id', eventController.findEventById);

router.put('/events/:id', eventController.updateEventById);

router.delete('/events/:id', eventController.deleteEventById);

module.exports = router;
