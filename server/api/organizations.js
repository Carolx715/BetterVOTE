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

router.post("/create", create);
router.get("/getList", getOrganizations);

async function create(req, res) {
	if (!req.body.name || !req.body.description) {
		res.status(400).send({ error: "Not all fields were filled" });
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
	};

	// use previously made addOrganization function to add organization
	database.addOrganization(data).then((result) => {
		if (result === "success") {
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

module.exports = router;
