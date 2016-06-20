var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({

	immersive: { type: Boolean, default: true },


});

module.exports = mongoose.model('Course', CourseSchema);