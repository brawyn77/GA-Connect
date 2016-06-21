var mongoose     = require('mongoose');
var crypto       = require('crypto');
var jwt          = require('jsonwebtoken');
var Schema       = mongoose.Schema;
module.require('./userProfile.js');

var UserSchema   = new Schema({
		_id: {type: Number},
		firstName: { type: String, uppercase: true },
    lastName: { type: String, uppercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    admin: Boolean,
    hash: String,
    salt: String,
		userProfile: [{type: Schema.Types.ObjectId, ref: 'UserProfile' }]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // THIS SHOULD NOT BE KEPT IN THE CODE
};

module.exports = mongoose.model('User', UserSchema);
