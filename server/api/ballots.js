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
router.get('/getBallot', getBallot);
router.get('/getList', getBallots);

async function createBallot(req, res) {
    if (!req.body.title || !req.body.description || !req.body.endTime || !req.body.voteThreshold || !req.body.organizationID) {
        res.status(400).send({ error: 'Not all fields were filled' });
        return;
    }

    const ballot = {
        organizationID: req.body.organizationID,
        status: 'active',
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
        },
        voters: []
    }

    database.createBallot(ballot)
    .then(response => {
        res.status(200).send({ id: response });
    }).catch(err => {
        console.log(`Error trying to create ballot with ${req.body}: ${err}`);
        res.status(500).send({ error: 'Internal server error' });
    });

}

async function getBallot(req, res) {
    if (!req.query.id) {
        res.status(400).send({ Error: "No ID was given" });
        return;
    }

    database.getBallot(req.query.id).then(data => {
        // if the status is active, don't send the current vote count
        if (data.status === "active") {
            delete data.votes;
        }
        // set the hasVoted variable
        if (data.voters.includes(req.user.email)) {
            data.hasVoted = true;
        } else {
            data.hasVoted = false;
        }
        delete data.voters;
        // return the data after it's been processed
        res.status(200).send(data);
    })
    .catch(err => {
        console.log(`Error fetching ${req.query.id} ballot: ${err}`);
        res.status(500).send({ error: 'Internal server error'});
    })
}

async function getBallots(req, res) {
    if (!req.query.orgid) {
        res.status(400).send({ error: "No organization ID was given" });
        return;
    }

    database.getBallots(req.query.orgid)
        .then(response => {
            let ballots = [];
            // iterate through each document returned in the response
            response.forEach(ballot => {
                // check if the user requesting has voted to set a boolean
                if (ballot.voters.includes(req.user.email)) {
                    ballot.hasVoted = true;
                } else {
                    ballot.hasVoted = false;
                }

                ballots.push({
                    _id: ballot._id,
                    status: ballot.status,
                    title: ballot.title,
                    description: ballot.description,
                    endTime: ballot.endTime,
                    hasVoted: ballot.hasVoted
                })
            });

            res.status(200).send(ballots);
        });
}

module.exports = router;