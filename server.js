// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser'); // utilise body parser
var passport = require('passport');
var cors = require('cors');
var mongoose = require('mongoose');

// Bring in the data models
var User = require('./models/user'); //  get our User model
var UserProfile = require('./models/userProfile'); // get our UserProfile model

var config = require('./config'); // get our config file
var dbs = require('./models/dbs');
var routes = require('./config/routes'); // link to the routes
require("./config/passport");
var port = process.env.PORT || 8080; // set our port

var app = express(); // define our app using express

mongoose.connect('mongodb://localhost/test'); // connect to our database
// app.set("superSecret", config.secret); // secret variable, might be redundant

app.use(morgan('dev')); // use morgan to log requests to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes); // namespace our routes

app.set('view engine', 'ejs');
// app.use(methodOverride('_method')); // do we need this?
app.set('views', path.join(__dirname, '/views'));














// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server on port " + port);
