var express   = require('express'),
	passport 		= require('passport'),
	bodyParser  = require('body-parser'),
	methodOverride = require('method-override'), //used to manipulate POST
	expressJWT = require('express-jwt'),
	auth = expressJWT({
		secret: 'MY_SECRET', // DON'T KEEP THIS HERE, MAKE IT AN ENV VARIABLE
		userProperty: 'payload'
	}),
	User = require('../models/user'),
	UserProfile = require('../models/userProfile');
	ctrlUsers = require('../controllers/users'),
	ctrlProfiles = require('../controllers/userProfiles');
	ctrlAuth = require('../controllers/authentication');

var app = express(); // define our app using express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Brad was here')
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router


// ===== AUTHENTICATION ROUTES


// Index. If user is logged in, go to dashboard(?), otherwise, go to /login
router.get('/', function(req, res){
    res.json({ message: 'api is working!' });
	// res.send("Hello! The API is at http://localhost:" + port + "/api");
});

router.get('/register', function(req, res){
	res.render('register');
});

// Do we route to a dashboard here, or on the frontend?
router.post('/register', ctrlAuth.register);

router.get('/login', function(req, res){
	res.render('login');
});

// Do we route to a dashboard here, or on the frontend?
router.post('/login', ctrlAuth.login);


// ===== USER ROUTES

// Look at the user details of the logged in user
router.get('/user', auth, ctrlUsers.userRead);

// Edit the user detail for the logged-in user
router.put('/user', auth, ctrlUsers.updateUser);

// Delete the user for the logged-in user
router.delete('/user', auth, ctrlUsers.removeUser);

// Display user details for all users
router.get('/users', ctrlUsers.allUsers);

// Display user detail for one user
router.get('/users/:id', ctrlUsers.oneUser);




// ===== PROFILE ROUTES

// Create a new profile for the logged-in user
router.post('/profile', auth, ctrlProfiles.createProfile);

// Look at the profile for the logged-in user
router.get('/profile', auth, ctrlProfiles.readProfile);

// Edit the profile for the logged-in user
router.put('/profile', auth, ctrlProfiles.updateProfile);

// Delete the profile for the logged-in user
router.delete('/profile', auth, ctrlProfiles.removeProfile);

// Display profiles for all users
router.get('/profiles', ctrlProfiles.allProfiles);

// Display just one profile for any user
router.get('/profiles/:id', ctrlProfiles.oneProfile);


// ===== SEARCH ROUTES

// Search user profiles by skill
router.get('/profiles/search/skills/:skill', ctrlProfiles.searchSkills);

router.get('/profiles/search/city/:city', ctrlProfiles.searchCity);

router.get('/profiles/search/goals/:goal', ctrlProfiles.searchGoal);

router.get('/profiles/search/course/:course', ctrlProfiles.searchCourse);

router.get('/profiles/search/multiple/:skill/:city/:goal/:course', ctrlProfiles.searchMultiple);


// No need to logout on the back end. Make it delete the token on the front end.
router.post('/logout');


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




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// more routes for our API will happen here







// on routes that end in /users
// ----------------------------------------------------
// router.route("/users");

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




// on routes that end in /users/:user_id
// ----------------------------------------------------

// router.route("/users/:user_id");
//
// // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
// router.get(function(req, res) {
// 	User.findById(req.params.user_id, function(err, user) {
// 		if (err)
// 			res.send(err);
// 		res.json(user);
// 	});
// });



//
// function getCandy(request, response) {
//   var id = request.params.id;
//
//   Candy.findById({_id: id}, function(error, candy) {
//     if(error) response.json({message: 'Could not find candy b/c:' + error});
//
//     response.json({candy: candy});
//   });
// }


// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
// router.put(function(req, res) {
//
//     // use our user model to find the user we want
// 	User.findById(req.params.user_id, function(err, user) {
//
// 		if (err)
// 			res.send(err);
//
//         // update the users info
// 		user.firstName = req.body.firstName; // set the users name (comes from the request)
// 		user.lastName = req.body.lastName;
// 		user.email = req.body.email;
//         // Need bcrypt to hash password
// 		user.password = req.body.password;
// 		user.admin = req.body.admin; // Might need to be adjusted since this is boolean
//
//         // save the user
// 		user.save(function(err) {
// 			if (err)
// 				res.send(err);
//
// 			res.json({
// 				message: "err updated!"
// 			});
// 		});
// 	});
// });

// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
// router.delete(function(req, res) {
// 	User.remove({
// 		_id: req.params.user_id
// 	}, function(err, user){
// 		if (err)
// 			res.send(err);
//
// 		res.json({
// 			message: "Successfully deleted"
// 		});
// 	});
// });

// on routes that end in /userProfile/:user_id
// ----------------------------------------------------
// router.route("/user/:user_id/userProfile");
//
// // access userprofile data for user id
// router.get(function(req, res) {
// 	User.findById(req.params.user_id, function(err, user) {
// 		if (err)
// 			res.send(err);
// 		res.json(user);
// 	});
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use(passport.initialize());
// app.use('/api', router);

module.exports       = router;
