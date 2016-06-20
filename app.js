var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.get('/', function (request, response) {
  response.render('index', {title: 'GA Connect - Get to know fellow GA students.'});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000');
})