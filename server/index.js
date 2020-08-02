//this is the main server file (hosted online on digital ocean)
//^^react native doesn't like fetching from "localhost"

const express = require("express");
const app = express();
const cors = require("cors");

//allows requests to be made from any ip/domain (allowed addresses go inside brackets)
app.use(cors());

// method inbuilt in express to parse requests and attach to req.body
app.use(express.json());

app.use("/users", require("./users/users"));
app.use("/organizations", require("./api/organizations"));

app.listen(8000, function () {
	console.log("Server listening on port 8000");
});
