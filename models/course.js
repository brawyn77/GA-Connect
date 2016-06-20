var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function capitalize (val) {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
}

var CourseSchema = new Schema({
	immersive: { type: Boolean, default: true },
	name: { type: String, set: capitalize}
});

module.exports = mongoose.model('Course', CourseSchema);