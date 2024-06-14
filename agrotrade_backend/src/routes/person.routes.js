const router = require('express-promise-router')();
const personController = require('../controllers/person.controller');

router.post('/persons', personController.createPerson);

router.get('/persons', personController.listAllPersons);

router.get('/persons/:id', personController.findPersonById);

router.put('/persons/:id', personController.updatePersonById);

router.delete('/persons/:id', personController.deletePersonById);

module.exports = router;
