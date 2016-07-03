var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
	// User Profile  information
	_creator: {type: Number, ref: "User"},
	profileActive: { type: Boolean, default: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	picture: { type: Schema.Types.ObjectId, ref: "User" },
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

module.exports = mongoose.model("UserProfile", UserProfileSchema);
