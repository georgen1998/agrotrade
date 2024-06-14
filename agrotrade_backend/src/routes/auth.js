const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware'); 
const Person = require('../models/Person'); 

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Person.findOne({ where: { username, password } });
        if (user) {
            // Generate JWT token
            jwt.sign({ user }, 'YourSecretKey', { expiresIn: '30m' }, (err, token) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json({ token, userId: user.id, type: user.type });
                }
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error('Login error:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
