var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userProfileSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'UserSchema' }
	picture: ,
    currentStudent: Boolean,
    course: []
    	courseStart: Boolean
    	courseEnd: ({ type: Date, })


Picture
Courses
Github/Portfoilio
LinkedIn
Email
One liner
Elevator Pitch
Location
Goals
Skills
Password
Admin?
Active: Yes/no
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;