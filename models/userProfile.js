var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
	// User Profile  information
	_creator: {type: Number, ref: 'User'},
	profileActive: { type: Boolean, default: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	picture: { type: Schema.Types.ObjectId, ref: 'UserPicture' },
	headline: { type: String, maxlength: 120 },
	elevatorPitch:  { type: String, maxlength: 300 },
	goals: { type: String, maxlength: 300 },
	skills: { type: String, maxlength: 300 },

	// Contact & location
	portfolioURL: { type: String, lowercase: true },
	linkedinURL: { type: String, lowercase: true },
	country: { type: String, maxlength: 30 },
	city: { type: String, maxlength: 30 },

	// Courses
	course: [{
		courseName: { type: String, maxlength: 50 },
		courseStart: { type: Date, default: Date.now, min: Date('2012-01-01') },
		courseEnd: { type: Date, default: Date.now, min: Date('2012-01-01') },
	}]

});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
