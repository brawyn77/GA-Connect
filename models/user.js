var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstName: { type: String, uppercase: true },
    lastName: { type: String, uppercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
