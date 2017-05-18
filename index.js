"use strict";

var express = require('express'),
	app = express(),
	path = require('path');

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/.'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index');
});

var signin = require('./routes/signin');
app.use('/signin', signin);

var signout = require('./routes/signout');
app.use('/signout', signout);

var jscalculator = require('./routes/jscalculator');
app.use('/jscalculator', jscalculator);


var server = app.listen(app.get('port'), function() {
	console.log('Servidor escuchando en el puerto %s', app.get('port'));
});
