const Person = require('../models/Person');

const ERROR_MESSAGE = 'An error occurred';

exports.createPerson = async (req, res) => {
    const { body } = req;
    try {
        const newPerson = await Person.create(body);
        res.status(201).send({
            message: 'Person added successfully!',
            body: { person: newPerson },
        });
    } catch (error) {
        console.error('createPerson', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllPersons = async (req, res) => {
    try {
        const { type } = req.query;
        let persons;

        if (type) {
            persons = await Person.findAll({
                where: {
                    type: type
                }
            });
        } else {
            persons = await Person.findAll();
        }
        //console.log('Persons:', persons); // Log the persons
        res.status(200).send(persons);
    } catch (error) {
        console.error('listAllPersons', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findPersonById = async (req, res) => {
    const { id } = req.params;
    try {
        const person = await Person.findByPk(id);
        if (!person) {
            throw 'person_not_found';
        }
        res.status(200).send(person);
    } catch (error) {
        console.error('findPersonById', error);
        if (error === 'person_not_found') {
            res.status(404).send({
                message: 'Person not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updatePersonById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Person.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'person_not_found';
        }
        res.status(200).send({ message: 'Person Updated Successfully!' });
    } catch (error) {
        console.error('updatePersonById', error);
        if (error === 'person_not_found') {
            res.status(404).send({
                message: 'Person not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deletePersonById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Person.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'person_not_found';
        }
        res.status(200).send({ message: 'Person deleted successfully!' });
    } catch (error) {
        console.error('deletePersonById', error);
        if (error === 'person_not_found') {
            res.status(404).send({
                message: 'Person not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
