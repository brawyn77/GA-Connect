var express   = require('express'),
	passport 		= require("passport"),
	bodyParser  = require('body-parser');

var app = express(); // define our app using express

console.log("Brad was here")
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// route to authenticate a user (POST http://locahost:8080/api/authenticate)
// router.post("/authenticate", function(req, res) {
//
//   // find the user
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//
//     if (err) throw err;
//
//     if (!user) {
//       res.json({success: false, message: "Authentication failed. Email not found." });
//     } else if (user) {
//
//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({success: false, message: "Authentication failed. Password is incorrect." });
//       } else {
//
//         // if user is found and password is correct
//         // create a token
//         var token = jwt.sign(user, app.get("superSecret"), {
//           expiresIn: "1440m" // expires in 24 hours
//         });
//
//         // return the information token as JSON
//         res.json({
//           success: true,
//           message: "Enjoy your token!",
//           token: token
//         });
//       }
//     }
//   });
// });

// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     // console.log("Testing middleware.");
//     // next(); // make sure we go to the next routes and don"t stop here


// ALL THIS CAN PROBABLY BE DELETED DOWN TO THE #####
//     var token = req.body.token || req.query.token || req.headers["x-access-token"];
//
//     // decode token
//     if (token) {
//
//       // verifies secret and checks exp
//       jwt.verify(token, app.get("superSecret"), function(err, decoded) {
//         if (err) {
//           return res.json({success: false, message: "Failed to authenticate token." });
//         } else {
//           // if everything is good, save to request for use in other routes
//           req.decoded = decoded;
//           next(); // make sure we go to the next routes and don"t stop here
//         }
//       });
//
//     } else {
//
//       // if there is no token
//       // return an error
//       return res.status(403).send({
//         success: false,
//         message: "No token provided."
//       });
//     }


// #############################
// });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
    res.json({ message: "api is working!" });
	// res.send("Hello! The API is at http://localhost:" + port + "/api");
});

// more routes for our API will happen here

// router.get("/setup", function(req, res) {
//
//   // create a sample user
//   var nick = new User({
//     firstName: "Nick",
//     lastName: "Butcher",
//     email: "nick@example.com",
//     // This is obviously not the way to store passwords
//     password: "password",
//     admin: false
//   });
//
//   // save the sample user
//   nick.save(function(err) {
//     if (err) throw err;
//
//     console.log("User saved successfully");
//     res.json({success: true});
//   });
// });


// profile
router.get("/profile");

// authentication
router.post("/register");
router.post("/login");


// on routes that end in /users
// ----------------------------------------------------
router.route("/users");

// create a user (accessed at POST http://localhost:8080/api/users)
// .post(function(req, res) {
//
//     var user = new User();      // create a new instance of the User model
//     user.firstName = req.body.firstName;  // set the users name (comes from the request)
//     user.lastName = req.body.lastName;
//     user.email = req.body.email;
//     // Need bcrypt to hash password
//     const password = req.body.password;
//     var hash = bcrypt.hashSync(password, saltRounds);
//     user.password = hash;
//     user.admin = req.body.admin; // Might need to be adjusted since this is boolean
//
//     // save the user and check for errors
//     user.save(function(err) {
//         if (err) {
//           res.send(err);
//         } else {
//
//         res.json({ message: "User created!" });
//     };
//   });
//   console.log(user);
//
// })

// get all the users (accessed at GET http://localhost:8080/api/users)

router.get(function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
});

// on routes that end in /users/:user_id
// ----------------------------------------------------

router.route("/users/:user_id");

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
router.get(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
});

// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
router.put(function(req, res) {

    // use our user model to find the user we want
	User.findById(req.params.user_id, function(err, user) {

		if (err)
			res.send(err);

        // update the users info
		user.firstName = req.body.firstName; // set the users name (comes from the request)
		user.lastName = req.body.lastName;
		user.email = req.body.email;
        // Need bcrypt to hash password
		user.password = req.body.password;
		user.admin = req.body.admin; // Might need to be adjusted since this is boolean

        // save the user
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({
				message: "err updated!"
			});
		});
	});
});

// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
router.delete(function(req, res) {
	User.remove({
		_id: req.params.user_id
	}, function(err, user){
		if (err)
			res.send(err);

		res.json({
			message: "Successfully deleted"
		});
	});
});

// on routes that end in /userProfile/:user_id
// ----------------------------------------------------
router.route("/user/:user_id/userProfile");

// access userprofile data for user id
router.get(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(passport.initialize());
app.use("/api", router);

module.exports       = router;
