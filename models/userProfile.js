var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
	// User basic information
	profileActive: { type: Boolean, default: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	picture: { type: Schema.Types.ObjectId, ref: 'UserPicture' },
	headline: { type: String, maxlength: 120 },
	elevatorPitch:  { type: String, maxlength: 300 },
	goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
	skills: [{ type: Schema.Types.ObjectId, ref: 'Skills' }],

	// Contact & location
	portfolioURL: { type: String, lowercase: true },
	linkedinURL: { type: String, lowercase: true },
	email: { type: String, lowercase: true },
	country: { type: Schema.Types.ObjectId, ref: 'Country' },
	city: { type: Schema.Types.ObjectId, ref: 'City' },

	// Courses
	course: [{ 
		courseName: { type: Schema.Types.ObjectId, ref: 'Course' }, 
		courseStart: { type: Date, default: Date.now, min: Date('2012-01-01') }, 
		courseEnd: { type: Date, default: Date.now, min: Date('2012-01-01') },
		}]

});

module.exports = mongoose.model('UserProfile', UserProfileSchema);