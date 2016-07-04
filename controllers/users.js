var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports.userRead = function(req, res){
	// Check for a user ID in the JWT
	if (!req.payload._id) {
		res.status(401).json({message: "Unauthorised user"});
	} else {
		User.findById(req.payload._id).exec(function(err, user) {
	res.status(200).json(user);
      });
	}
};

module.exports.updateUser = function(req, res){
	// Check for a user ID in the JWT
	if (!req.payload._id){
		res.staus(401).json({message: "Unauthorised user"});
	} else {
		User.findById({_id: req.payload._id}, function(err, user){
			if (err){
				res.json({message: "User not found"});
			} else {
				if (req.body.firstName) user.firstName = req.body.firstName;
				if (req.body.lastName) user.lastName = req.body.lastName;
				if (req.body.email) user.email = req.body.email;

				user.save(function(err){
					if (err){
						res.status(401).json({message: "User could not be updated"});
					} else {
						res.status(200).json(user);
					};
				});
			};
		});
	};
};

module.exports.removeUser = function(req, res){
	// Check for a user ID in the JWT
	if (!req.payload._id){
		res.status(401).json({message: "Unauthorised user"});
	} else {
		User.remove({_id: req.payload._id}, function(err){
			if (err){
				res.json({message: "User not found"});
			} else {
				res.json({message: "User has been removed"});
			};
		});
	};
};

module.exports.allUsers = function(req, res){
	// Check for a user ID in the JWT
	// if (!req.payload._id){
	// 	res.status(401).json({
	// 		"message" : "UnauthorizedError: unauthorized user"
	// 	});
	// } else {
		User
		.find({})
		.exec(function(err, users){
			res.status(200).json(users);
		});
	// };
};

module.exports.oneUser = function(req, res){
	// Check for a user ID in the JWT
	// var id = req.params.id;
	// if(!req.payload._id){
	// 	res.status(401).json({
	// 		"message" : "UnauthorizedError: unauthorized user"
	// 	});
	// } else {
		User
		.findById({_id: id}, function(err, user){
			if(err) res.json({message: 'Could not find user because: ' + err});
			res.status(200).json({user: user});
		});
	// };
};
