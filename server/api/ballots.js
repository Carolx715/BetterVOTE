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
router.post('/vote', vote);
router.post('/addArgument', addArgument)
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
        voters: [],
        maxVotes: 0
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

    database.getBallot(req.query.id).then(async (response) => {
        let data = response;
        if (data.endTime < Date.now() && data.status === "active") {
            console.log(`Ballot ${data.title} has ended!`);
            let resolvedBallot = await database.resolveBallot(data._id);
            if (resolvedBallot) {
                data = resolvedBallot;
            }
        }
        if (ballot.status === "ended") {
            if (ballot.votes.against === 0 && ballot.votes.support > 0) {
                ballot.result = "passed";
            }
            else if ((ballot.votes.support / ballot.votes.against) > ballot.voteThreshold) {
                ballot.result = "passed";
            } else {
                ballot.result = "failed";
            }
        };
        data.totalVotes = data.votes.support + data.votes.against + data.votes.abstain;
        // if the status is active, don't send the current vote count & get the running org size for max votes
        if (data.status === "active") {
            let orgData = await database.getOrganizationByID(data.organizationID);
            data.maxVotes = orgData.memberCount;
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

    database.getBallots(req.query.orgid, "ended")
        .then(async (response) => {
            let ballots = [];
            // iterate through each document returned in the response
            for (let i = 0; i < response.length; i++) {
                let ballot = response[i];
                if (ballot.endTime < Date.now() && ballot.status === "active") {
                    console.log(`Ballot ${ballot.title} has ended!`);
                    let resolvedBallot = await database.resolveBallot(ballot._id);
                    if (resolvedBallot) {
                        ballot = resolvedBallot;
                    }
                }
                // check if the user requesting has voted to set a boolean
                if (ballot.voters.includes(req.user.email)) {
                    ballot.hasVoted = true;
                } else {
                    ballot.hasVoted = false;
                }

                if (ballot.status === "ended") {
                    if (ballot.votes.against === 0 && ballot.votes.support > 0) {
                        ballot.result = "passed";
                    }
                    else if ((ballot.votes.support / ballot.votes.against) > ballot.voteThreshold) {
                        ballot.result = "passed";
                    } else {
                        ballot.result = "failed";
                    }
                };

                ballots.push({
                    _id: ballot._id,
                    status: ballot.status,
                    title: ballot.title,
                    description: ballot.description,
                    endTime: ballot.endTime,
                    result: ballot.result,
                    hasVoted: ballot.hasVoted
                });
            }

            res.status(200).send(ballots);
        });
}

async function vote(req, res) {
    if (!req.body.ballotID || !req.body.vote) {
        res.status(400).send({ error: "Not all fields were filled" });
        return;
    }

    if (req.body.vote !== "support" && req.body.vote !== "against" && req.body.vote !== "abstain") {
        res.status(403).send({ error: "Invalid vote option" });
        return;
    }

    let ballot = await database.getBallot(req.body.ballotID);
    if (ballot.voters.includes(req.user.email) && ballot.status === "active") {
        res.status(403).send({ error: "You have already voted on this ballot" });
    } else {
        await database.vote(req.body.ballotID, req.body.vote, req.user.email).catch(err => {
            res.status(500).send({ error: "Internal server error" });
        });
        res.status(200).send({ success: true });
    }
}

async function addArgument(req, res) {
    if (!req.body.type || !req.body.argument || !req.body.ballotID ) {
        res.status(400).send({ error: "Not all fields were filled" });
        return;
    }
    if (req.body.type === "support" || req.body.type === "against") {
        await database.addArgument(req.body.ballotID, req.body.type, req.body.argument).catch(err => {
            res.status(500).send({ error: "Internal server error. Maybe the ballot ID was incorrect?" });
        });
        res.status(200).send({ success: true });
    } else {
        res.status(400).send({ error: "Invalid type" });
    }
}

module.exports = router;