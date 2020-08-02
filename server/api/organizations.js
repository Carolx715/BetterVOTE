const express = require("express");
const router = express.Router();
const crypto = require("crypto");
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

router.post("/create", create);
router.post("/join", joinOrganization);
router.get("/getOrg", getOrganizationByID);
router.get("/getList", getOrganizations);

async function create(req, res) {
	if (!req.body.name || !req.body.description) {
		res.status(400).send({ error: "Not all fields were filled" });
		return;
	}

	const data = {
		name: req.body.name,
		description: req.body.description,
		representatives: [
			{
				username: req.user.username,
				email: req.user.email,
				title: "President",
			},
		],
		users: [{ username: req.user.username, email: req.user.email }],
		memberCount: 1,
		createdDate: Date.now(),
		inviteCode: crypto.randomBytes(4).toString("hex"), // generate random 8 character code (1 byte -> 2 hex characters)
	};

	// check to make sure no organization already has the invite code
	let organization = await database.getOrganizationByCode(data.inviteCode);
	while (organization) {
		console.log(`org code ${data.inviteCode} already exists`);
		data.inviteCode = crypto.randomBytes(4).toString("hex");
		organization = await database.getOrganizationByCode(data.inviteCode);
	}

	// use previously made addOrganization function to add organization
	database.addOrganization(data).then((result) => {
		if (result === "success") {
			console.log(`Created organization: ${JSON.stringify(data)}`);
			res.sendStatus(200);
		} else {
			res.status(500).send({ error: "Internal server error" });
			console.log(
				`Internal server error ${result} with ${JSON.stringify(req.body)} input`
			);
		}
	});
}

async function getOrganizations(req, res) {
	database.getOrganizations(req.user.email).then((result) => {
		if (!result.error) {
			res.status(200).send(result);
		} else {
			res.status(500).send({ error: "Internal server error" });
			console.log(
				`Internal server error ${result} with ${req.user.email} email`
			);
		}
	});
}

async function getOrganizationByID(req, res) {
	if (!req.query.id) {
		res.status(400).send({ Error: "No ID was given" });
		return;
	}
	let organization = await database
		.getOrganizationByID(req.query.id)
		.catch((err) => {
			console.log(`Error finding database by ID ${req.query.id}: ${err}`);
			res.status(400).send({ error: "Invalid organization ID" });
			return;
		});

	if (organization) {
		let userExists = false;
		for (let i = 0; i < Object.keys(organization.users).length; i++) {
			if (organization.users[i].email === req.user.email) {
				userExists = true;
				break;
			}
		}

		if (userExists) {
			res.status(200).send(organization);
		} else {
			res.status(403).send({ Error: "You are not apart of that organization" });
		}
	} else {
		res.status(400).send({ Error: "No organization was found" });
	}
}

async function joinOrganization(req, res) {
	if (!req.body.inviteCode) {
		res.status(400).send({ error: "Not all fields were filled" });
		return;
	}
	database
		.joinOrganizationByCode(
			req.body.inviteCode,
			req.user.username,
			req.user.email
		)
		.then((result) => {
			if (!result.error) {
				res.status(200).send("success");
			} else {
				res.status(403).send(result);
			}
		})
		.catch((err) => {
			res.status(500).send({ error: "Internal server error" });
			console.log(
				`Internal server error ${result} with ${JSON.stringify(req.body)} input`
			);
		});
}

module.exports = router;
