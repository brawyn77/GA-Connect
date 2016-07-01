// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
// var path = require("path"); // Not sure if we need this yet
// var jwt = require("jsonwebtoken"); // use to create, sign, and verify tokens
var config = require("./config"); // get our config file
var dbs = require("./models/dbs");

var routes = require("./config/routes");
app.use("/api", routes);

app.use(cors());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// use morgan to log requests to the console
app.use(morgan("dev"));

var User = require("./models/user"); //  get our Mongoose model
require("./config/passport");

var UserProfile = require("./models/userProfile");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test"); // connect to our database
// app.set("superSecret", config.secret); // secret variable, might be redundant


// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server on port " + port);
