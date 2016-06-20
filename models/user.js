var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstName: { type: String, uppercase: true },
    lastName: { type: String, uppercase: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, maxlength: 12 },
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
