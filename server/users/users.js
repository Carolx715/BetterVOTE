const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const database = require('../databaseHelper');

const dotenv = require('dotenv').config();

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/isloggedin',
    expressJWT({ secret: process.env.JWT_SECRET, algorithms: ['HS256']}),
    (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(err.status).send({ error: err });
            return;
        }
        next();
    },
    isLoggedIn);

async function register(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({ error: 'Not all fields were complete' });
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        // regex to check email format
        res.status(400).send({ error: 'Invalid email' });
        return;
    }

    let userExists = await database.getUser(req.body.username, req.body.email);
    if (userExists) {
        res.status(403).send({ error: 'Username or email already exists' });
        return;
    }

    database.addUser(req.body.username, req.body.email, bcrypt.hashSync(req.body.password)).then(result => {
        if (result === 'success') {
            res.status(200).send({
                jwt: jwt.sign({ username: req.body.username, email: req.body.email }, process.env.JWT_SECRET)
            });
        } else {
            res.status(500).send({ error: 'Internal server error'});
            console.log(`Internal server error ${result} with ${JSON.stringify(req.body)} input`)
        }
    })
}

async function authenticate(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ error: 'Not all fields were complete' });
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        // regex to check email format
        res.status(400).send({ error: 'Invalid email' });
        return;
    }

    let user = await database.getUser(null, req.body.email);
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                jwt: jwt.sign({ username: req.body.username, email: req.body.email }, process.env.JWT_SECRET)
            });
        } else {
            res.status(403).send({ error: 'Password incorrect'});
        }
    } else {
        res.status(403).send({ error: 'User does not exist'})
    }
}

async function isLoggedIn(req, res) {
    res.sendStatus(200);
}

module.exports = router;