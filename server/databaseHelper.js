const dotenv = require("dotenv").config();
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//initalize database as null
let db = null;

//connect to mongodb database
mongoClient.connect((err, client) => {
	if (err) {
		console.error(err);
	}
	db = client.db("database");
	console.log("Successfully connected to database");
});

//get a specifc user
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

//add a user to the "users" collection
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

async function getOrganizations(email) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations")
				.find({ "users.email": email })
				.project({ representatives: 0, users: 0 })
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

async function getOrganizationByID(id) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations").findOne({ "_id": ObjectID(id) }, function (err, result) {
				if (err) throw err;
				resolve(result);
			});
		} catch (err) {
			reject(err);
		}
	});
}

async function getOrganizationByCode(code) {
	return new Promise((resolve, reject) => {
		try {
			db.collection("organizations").findOne({ "inviteCode" : code }, function (err, result) {
				if (err) throw err;
				resolve(result);
			});
		} catch (err) {
			reject(err);
		}
	});
}

async function joinOrganizationByCode(code, username, email) {
	return new Promise((resolve, reject) => {
		const userData = { 
			username: username, 
			email: email 
		}
		try {
			// check if user is already in organization
			db.collection("organizations").findOne({ $and: [{ "inviteCode": code }, { "users.email": email }] },
			function (err, result) {
				if (err) throw err;
				if (result) {
					resolve({ error: 'You have already joined this organization' });
				} else {
					// find document with given invite code, push the user to the list of users and increment userCount
					db.collection("organizations").updateOne({ "inviteCode": code }, { $push: { users: userData }, $inc: { userCount: 1 } }, function (err, result) {
						if (err) throw err;
						if (result.result.nModified > 0) {
							resolve("success");
						} else {
							resolve({ error: 'Organization does not exist' })
						}
						resolve(result.result.nModified);
					})
				}
			});
		} catch (err) {
			reject(err);
		}
	})
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.addOrganization = addOrganization;
exports.getOrganizations = getOrganizations;
exports.getOrganizationByID = getOrganizationByID;
exports.getOrganizationByCode = getOrganizationByCode;
exports.joinOrganizationByCode = joinOrganizationByCode;