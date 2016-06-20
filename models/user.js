var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true }
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);