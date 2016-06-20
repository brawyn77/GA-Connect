var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
	name: { type: String }
});

module.exports = mongoose.model('Goal', GoalSchema);