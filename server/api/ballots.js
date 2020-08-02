const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const database = require("../databaseHelper");

// Set JWT validation middleware
router.use(
    expressJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })
);

router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status).send({ error: err });
        return;
    }
    next();
});

router.post('/create', createBallot);

async function createBallot(req, res) {
    if (!req.body.title || !req.body.description || !req.body.endTime || !req.body.voteThreshold || !req.body.organizationID) {
        res.status(400).send({ error: 'Not all fields were filled' });
        return;
    }

    const ballot = {
        organizationID: req.body.organizationID,
        title: req.body.title,
        description: req.body.description,
        creator: {
            username: req.user.username,
            email: req.user.email
        },
        endTime: req.body.endTime,
        voteThreshold: req.body.voteThreshold,
        arguments: {
            support: [],
            against: []
        },
        votes: {
            support: 0,
            against: 0,
            abstain: 0
        }
    }

    database.createBallot(ballot)
    .then(response => {
        res.status(200).send(response);
    }).catch(err => {
        console.log(`Error trying to create ballot with ${req.body}: ${err}`);
        res.status(500).send({ error: 'Internal server error' });
    })

}

module.exports = router;