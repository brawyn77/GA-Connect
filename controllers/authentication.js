var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {

  // Might not need this bit
	if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	var user = new User();

  // Probably need a lot more error validation here
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
		console.log(user);
	});
	console.log(user);
};

module.exports.login = function(req, res) {

// Might not need this bit
	if(!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	passport.authenticate("local", function(err, user, info){
		var token;

    // If Passport throws/catches an error
		if (err) {
			res.status(404).json(err);
			return;
		}

    // If a user is found
		if(user){
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
      // If user is not found
			res.status(401).json(info);
		}
	})(req, res);

};
