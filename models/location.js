var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CountrySchema   = new Schema({
    name: { type: String, required: false },
    cities: [citySchema], default: []
});

var CitySchema   = new Schema({
    name: { type: String, required: false }
});

module.exports = mongoose.model('City', CitySchema);
module.exports = mongoose.model('Country', CountrySchema);