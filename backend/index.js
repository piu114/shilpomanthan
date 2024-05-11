// Replace the uri string with your connection string.
const uri = "mongodb+srv://ankita:ankita@shilpomanthan.oaicert.mongodb.net/shilpomanthan";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(uri,
	{
		useNewUrlParser: true,
	}
)
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Error...", err);
		process.exit();
	});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "Server is running :D" });
});

let PORT = 8080;
require('./app/routes/app.routes.js')(app);
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});