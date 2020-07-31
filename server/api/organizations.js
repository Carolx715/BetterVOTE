const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');
const database = require('../databaseHelper');

// Set JWT validation middleware
router.use(expressJWT({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({ error: err });
        return;
    }
    next();
});

router.post('/create', create);

async function create(req, res) {
    if (!req.body.name || !req.body.description) {
        res.status(400).send({ error: 'Not all fields were filled' });
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        representatives: [
            {
                username: req.user.username,
                email: req.user.email,
                title: 'President'
            }
        ],
        users: [{username: req.user.username, email: req.user.email}]
    }

    database.addOrganization(data).then(response => {
        if (response === 'success') {
            res.sendStatus(200);
        } else {
            res.status(500).send({ error: 'Internal server error' });
            console.log(`Internal server error ${result} with ${JSON.stringify(req.body)} input`);
        }
    })
}

module.exports = router;