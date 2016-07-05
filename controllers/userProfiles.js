var mongoose = require("mongoose");
var User = mongoose.model("User");
var UserProfile = mongoose.model("UserProfile");

// User.findById(req.params.id)
//   .populate('image') //populate
//   .exec(function(err, user) {...})


module.exports.createProfile = function(req, res){
    // Check for a user ID in the JWT
    if (!req.payload._id){
        req.status(401).json({message: "Unauthorised user"});
    } else {
        var user = User.findById({_id: req.payload._id}, function(err, user){
            if (!user){
                res.status(401).json({message: "User not found"});
            } else {
                var userProfile = new UserProfile(req.body);
                userProfile.user = user._id;
                userProfile.save(function(err){
                    if (err) {
                        res.json(err)
                    } else {
                        user.userProfile = userProfile._id;
                        user.save(function(err){
                            if(err) {
                                res.json(err);
                            } else {
                                res.json(userProfile);
                            };
                        });
                    };
                });
            };
        });
    };
};

module.exports.readProfile = function(req, res){
    // Check for a user ID in the JWT
	if (!req.payload._id){
		req.status(401).json({message: "Unauthorised user"});
	} else {
        UserProfile.findOne({user: req.payload._id}, function(err, profile){
            if (err){
                res.json({message: "Profile not found"})
            } else {
                res.status(200).json(profile);
            };
        });
	};
};

module.exports.updateProfile = function(req, res){
    // Check for a user ID in the JWT
    if (!req.payload._id){
        req.status(401).json({message: "Unauthorised user"});
    } else {
        UserProfile.findOne({user: req.payload._id}, function(err, profile){
            if (err){
                res.json({message: "Profile not found"})
            } else {
                if (req.body.profileActive) profile.profileActive = req.body.profileActive;
                if (req.body.picture) profile.picture = req.body.picture;
                if (req.body.headline) profile.headline = req.body.headline;
                if (req.body.elevatorPitch) profile.elevatorPitch = req.body.elevatorPitch;
                if (req.body.goals) profile.goals = req.body.goals;
                if (req.body.skills) profile.skills = req.body.skills;
                if (req.body.portfolioURL) profile.portfolioURL = req.body.portfolioURL;
                if (req.body.linkedinURL) profile.linkedinURL = req.body.linkedinURL;
                if (req.body.country) profile.country = req.body.country;
                if (req.body.city) profile.city = req.body.city;
                if (req.body.courseName) profile.course.courseName = req.body.courseName;
                if (req.body.courseStart) profile.course.courseStart = req.body.courseStart;
                if (req.body.courseEnd) profile.course.courseEnd = req.body.courseEnd;

                profile.save(function(err){
                    if (err){
                        res.status(401).json({message: "Profile could not be updated"});
                    } else {
                        res.status(200).json(profile);
                    };
                });
            };
        });
    };
};

module.exports.removeProfile = function(req, res){
    // Check for a user ID in the JWT
    if (!req.payload._id){
        req.status(401).json({message: "Unauthorised user"});
    } else {
        UserProfile.remove({user: req.payload._id}, function(err){
            if (err){
                res.json({message: "No profile found"});
            } else {
                res.json({message: "Profile has been removed"});
            };
        });
    };
};


module.exports.allProfiles = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {

		// var populateQuery = [{path:'../models/user', select:'user'}, {path:'./models/userProfile', select:'picture'}];

        UserProfile.find({})
        .populate('user')
        .exec(function(err, profiles){
            if (err){
                res.json({message: "No profile found"});
            } else {
                res.status(200).json(profiles);
            };
        });
    // };
}

module.exports.oneProfile = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile.findOne({_id: req.params.id})
        .populate('user')
        .exec(function(err, profile){
            if (err){
                res.json({message: "No profile found"});
            } else {
                res.status(200).json(profile);
            };
        });
    // };
};

module.exports.searchSkills = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile.find({skills: req.params.skill})
        .populate('user')
        .exec(function(err, foundUsers){
            if (err){
                res.json({message: errmsg});
            } else if (foundUsers.length === 0){
                res.json({message: "No profiles found"});
            } else {
                res.json(foundUsers);
            };
        });
    // };
};

module.exports.searchCity = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile.find({city: req.params.city})
        .populate('user')
        .exec(function(err, foundUsers){
            if (err){
                res.json({message: errmsg});
            } else if (foundUsers.length === 0){
                res.json({message: "No profiles found"});
            } else {
                res.json(foundUsers);
            };
        });
    // };
};

module.exports.searchGoal = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile.find({goals: req.params.goal})
        .populate('user')
        .exec(function(err, foundUsers){
            if (err){
                res.json({message: errmsg});
            } else if (foundUsers.length === 0){
                res.json({message: "No profiles found"});
            } else {
                res.json(foundUsers);
            };
        });
    // };
};

module.exports.searchCourse = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile.find({'course.courseName': req.params.course})
        .populate('user')
        .exec(function(err, foundUsers){
            if (err){
                res.json({message: errmsg});
            } else if (foundUsers.length === 0){
                res.json({message: "No profiles found"});
            } else {
                res.json(foundUsers);
            };
        });
    // };
};

module.exports.searchMultiple = function(req, res){
    // Check for a user ID in the JWT
    // if (!req.payload._id){
    //     res.status(401).json({message: "Unauthorised user"});
    // } else {
        UserProfile
        .find({
            skills: req.params.skill,
            city: req.params.city,
            goals: req.params.goal,
            'course.courseName': req.params.course
        }).populate('user')
        .exec(function(err, foundUsers){
                if (err){
                    res.json({message: errmsg});
                } else if (foundUsers.length === 0){
                    res.json({message: "No profiles found"});
                } else {
                    res.json(foundusers);
            };
        });
    // };
};
