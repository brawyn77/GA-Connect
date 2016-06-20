var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
	name: { type: String }
});

module.exports = mongoose.model('Skill', SkillSchema);