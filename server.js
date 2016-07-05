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



mongoose.connect('mongodb://heroku_bwxbxl4b:n0m0Rem3aT@ds011745.mlab.com:11745/heroku_bwxbxl4b'); // connect to our database
// app.set("superSecret", config.secret); // secret variable, might be redundant

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev')); // use morgan to log requests to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'api_client')))

app.use(passport.initialize());

app.use('/api', routes); // namespace our routes


// app.use(methodOverride('_method')); // do we need this?

// Otherwise render the index.html page for the Angular SPA
// This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'api_client', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;















// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server on port " + port);
