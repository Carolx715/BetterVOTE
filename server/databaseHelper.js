//this file primarily interacts with the mongodb database

//enable the use of enviornment variables (in root directory)
const dotenv = require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient(process.env.DB_URL, {
	useNewUrlParser: true, //tool used to parse MongoDB connection strings
	useUnifiedTopology: true, //use new topology engine
});

let db = null;

//connect to mongodb database
mongoClient.connect((err, client) => {
	if (err) {
		console.error(err);
	}
	db = client.db("database");
	console.log("Successfully connected to database");
});

//user-database interaction

//retrieve user from mongodb database via username and email
async function getUser(username = null, email = null) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("users").findOne(
				{
					$or: [
						{
							username: username,
						},
						{
							email: email,
						},
					],
				},
				function (err, result) {
					if (err) throw err;
					resolve(result);
				}
			);
		} catch (err) {
			reject(err);
		}
	});
}

//add a user to the "users" collection via username, email and password
async function addUser(username, email, password) {
	return new Promise((resolve, reject) => {
		const data = {
			username: username,
			email: email,
			password: password,
		};
		try {
			db.collection("users").insertOne(data, function (err, res) {
				if (err) throw err;
				resolve("success");
			});
		} catch (err) {
			reject(err);
		}
	});
}

//organization-database interaction

//retrieve a list of joined organizations from email
async function getOrganizations(email) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations")
				.find({ "users.email": email })
				.project({ representatives: 0, users: 0 }) //don't show these fields
				.toArray(function (err, result) {
					if (err) throw err;
					resolve(result);
				});
		} catch (err) {
			reject(err);
		}
	});
}

// add organization to "organizations" collection
async function addOrganization(data) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations").insertOne(data, function (err, res) {
				if (err) err;
				resolve("success");
			});
		} catch (err) {
			reject({ error: err });
		}
	});
}

//get more information about a organization via it's unique id
async function getOrganizationByID(id) {
	return new Promise((resolve, reject) => {
		try {
			// ObjectID is used to convert a string objectID to the proper mongoDB ObjectID format
			db.collection("organizations").findOne({ _id: ObjectID(id) }, function (
				err,
				result
			) {
				if (err) throw err;
				resolve(result);
			});
		} catch (err) {
			reject(err);
		}
	});
}

//get organization by it's invite code
async function getOrganizationByCode(code) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations").findOne({ inviteCode: code }, function (
				err,
				result
			) {
				if (err) throw err;
				resolve(result);
			});
		} catch (err) {
			reject(err);
		}
	});
}

//join an organization
async function joinOrganizationByCode(code, username, email) {
	return new Promise((resolve, reject) => {
		const userData = {
			username: username,
			email: email,
		};
		try {
			// check if user is already in organization
			db.collection("organizations").findOne(
				{ $and: [{ inviteCode: code }, { "users.email": email }] },
				function (err, result) {
					if (err) throw err;
					if (result) {
						resolve({ error: "You have already joined this organization" });
					} else {
						// find document with given invite code, push the user to the list of users and increment memberCount
						db.collection("organizations").updateOne(
							{ inviteCode: code },
							{ $push: { users: userData }, $inc: { memberCount: 1 } },
							function (err, result) {
								if (err) throw err;
								if (result.result.nModified > 0) {
									resolve("success");
								} else {
									resolve({ error: "Organization does not exist" });
								}
								resolve(result.result.nModified);
							}
						);
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
}

async function createBallot(ballot) {
	// Insert ballot and return ID
	return db.collection("ballots").insertOne(ballot)
		.then(result => result.ops[0]._id)
}

async function getBallots(org, status = "all") {
	if (status !== "all") {
		return db.collection("ballots").find({
			$and: [
				{ organizationID: org },
				{ status: status }
			]
		}).toArray();
	} else {
		return db.collection("ballots").find({ organizationID: org }).toArray();
	}
}

async function getBallot(id) {
	return db.collection("ballots").findOne({ _id: ObjectID(id) });
}

async function vote(id, option, email) {
	return db.collection("ballots").updateOne({ _id: ObjectID(id) }, { $push: { voters: email }, $inc: { ["votes." + option]: 1 } })
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.addOrganization = addOrganization;
exports.getOrganizations = getOrganizations;
exports.getOrganizationByID = getOrganizationByID;
exports.getOrganizationByCode = getOrganizationByCode;
exports.joinOrganizationByCode = joinOrganizationByCode;
exports.createBallot = createBallot;
exports.getBallots = getBallots;
exports.getBallot = getBallot;
exports.vote = vote;