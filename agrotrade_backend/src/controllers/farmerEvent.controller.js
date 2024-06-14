const farmerEvent = require('../models/FarmerEvent');

const ERROR_MESSAGE = 'An error occurred';

exports.createFarmerEvent = async (req, res) => {
    const { body } = req;
    try {
        const newfarmerEvent = await farmerEvent.create(body);
        res.status(201).send({
            message: 'farmerEvent added successfully!',
            body: { farmerEvent: newfarmerEvent },
        });
    } catch (error) {
        console.error('createfarmerEvent', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
        });
    }
};

exports.listAllFarmerEvents = async (req, res) => {
    try {
        const farmerEvents = await farmerEvent.findAll();
        //console.log('farmerEvents:', farmerEvents); // Log the farmerEvents
        res.status(200).send(farmerEvents);
    } catch (error) {
        console.error('listAllfarmerEvents', error);
        res.status(500).send({
            message: ERROR_MESSAGE,
            error: error.message,
            code: error.parent.code,
            stack: error.stack,
        });
    }
};

exports.findFarmerEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const events = await farmerEvent.findAll({ where: { event_id: id, }, });
        if (!events) {
            throw 'farmerEvent_not_found';
        }
        res.status(200).send(events);
    } catch (error) {
        console.error('findfarmerEventById', error);
        if (error === 'farmerEvent_not_found') {
            res.status(404).send({
                message: 'farmerEvent not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.findEventFarmerById = async (req, res) => {
    const { id } = req.params;
    try {
        const events = await farmerEvent.findAll({ where: { farmer_id: id, }, });
        if (!events) {
            throw 'farmerEvent_not_found';
        }
        res.status(200).send(events);
    } catch (error) {
        console.error('findfarmerEventById', error);
        if (error === 'farmerEvent_not_found') {
            res.status(404).send({
                message: 'farmerEvent not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.updateFarmerEventById = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const [updatedRowsCount] = await farmerEvent.update(body, { where: { id: id } });
        if (updatedRowsCount === 0) {
            throw 'farmerEvent_not_found';
        }
        res.status(200).send({ message: 'farmerEvent Updated Successfully!' });
    } catch (error) {
        console.error('updatefarmerEventById', error);
        if (error === 'farmerEvent_not_found') {
            res.status(404).send({
                message: 'farmerEvent not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};

exports.deleteFarmerEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await farmerEvent.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            throw 'farmerEvent_not_found';
        }
        res.status(200).send({ message: 'farmerEvent deleted successfully!' });
    } catch (error) {
        console.error('deletefarmerEventById', error);
        if (error === 'farmerEvent_not_found') {
            res.status(404).send({
                message: 'farmerEvent not found.',
            });
        } else {
            res.status(500).send({
                message: ERROR_MESSAGE,
            });
        }
    }
};
