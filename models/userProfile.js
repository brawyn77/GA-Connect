var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongo = require('mongodb');
var Grid = require('gridfs-stream');

//define Model for metadata collection.
var GFS = mongoose.model("GFS", new Schema({}, {strict: false}), "fs.files" );

var UserProfileSchema = new Schema({
	// User Profile  information
	_creator: {type: Number, ref: "User"},
	profileActive: { type: Boolean, default: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	picture: { type: Schema.Types.ObjectId, ref: "GFS" },
	headline: { type: String, maxlength: 120 },
	elevatorPitch:  { type: String, maxlength: 300 },
	goals: { type: String, maxlength: 300 },
	skills: [{ type: String, maxlength: 300, lowercase: true }],

	// Contact & location
	portfolioURL: { type: String, lowercase: true },
	linkedinURL: { type: String, lowercase: true },
	country: { type: String, maxlength: 30, lowercase: true },
	city: { type: String, maxlength: 30, lowercase: true },

	// Courses
	course: [{
		courseName: { type: String, maxlength: 50 },
		courseStart: { type: Date, default: Date.now },
		courseEnd: { type: Date, default: Date.now }
	}]

});

// String newFileName = "my-image";
// File imageFile = new File("./ProfilePic/luke.jpg");
// GridFS gfsPhoto = new GridFS(db, "photo");
// GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
// gfsFile.setFilename(newFileName);
// gfsFile.save();

// create or use an existing mongodb-native db instance
// var db = new mongo.Db('test', new mongo.Server("localhost", 8080));
// var gfs = Grid(db, mongo);

// streaming to gridfs
// var writestream = gfs.createWriteStream({
//     filename: 'luke.jpg'
// });
// fs.createReadStream('./ProfilePic/luke.jpg').pipe(writestream);

// streaming from gridfs
// var readstream = gfs.createReadStream({
//   filename: 'luke.jpg'
// });

//error handling, e.g. file does not exist
// readstream.on('error', function (err) {
//   console.log('An error occurred!', err);
//   throw err;
// });

// readstream.pipe(response);
module.exports = mongoose.model("UserProfile", UserProfileSchema);
