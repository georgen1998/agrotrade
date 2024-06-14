const Event = require('../models/Event');

const ERROR_MESSAGE = 'An error occurred';

exports.createEvent = async (req, res) => {
    const { body } = req;
    try {
        const newEvent = await Event.create(body);
        res.status(201).send({
            message: 'Event added successfully!',
            body: { event: newEvent },
        });
    } catch (error) {
        console.error('createEvent', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        //console.log('Events:', events); // Log the events
        res.status(200).send(events);
    } catch (error) {
        console.error('listAllEvents', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            throw 'event_not_found';
        }
        res.status(200).send(event);
    } catch (error) {
        console.error('findEventById', error);
        if (error === 'event_not_found') {
            res.status(404).send({
                message: 'Event not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateEventById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await Event.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'event_not_found';
        }
        res.status(200).send({ message: 'Event Updated Successfully!' });
    } catch (error) {
        console.error('updateEventById', error);
        if (error === 'event_not_found') {
            res.status(404).send({
                message: 'Event not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Event.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'event_not_found';
        }
        res.status(200).send({ message: 'Event deleted successfully!' });
    } catch (error) {
        console.error('deleteEventById', error);
        if (error === 'event_not_found') {
            res.status(404).send({
                message: 'Event not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
