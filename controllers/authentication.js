var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {
	if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	var user = new User();
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.admin = req.body.admin;
	user.save(function(err) {
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"First Name" : user.firstName,
			"Last Name" : user.lastName,
			"Email" : user.email,
			"Admin" : user.admin,
			"token" : token
		});
	});
	// redirect to the update profile route
};

module.exports.login = function(req, res) {
	if(!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	passport.authenticate('local', function(err, user, info){
    // If Passport throws/catches an error
		if (err) {
			res.status(404).json(err);
			return;
		}
    // If a user is found
		if(user){
			var token = user.generateJwt();
			res.status(200);
			res.json({
				'token' : token
			});
		} else {
      // If user is not found
			res.status(401).json(info);
		}
	})(req, res);
};
