"use strict";

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path');

var mongoose = require('mongoose');

//conectandonos a la base de datos
// var configDB = require('./config/databaseU.js');
// mongoose.connect(configDB.url);

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/static/'));
app.use(express.static(__dirname + '/bower_components/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index');
});

var login = require('./routes/login');
app.use('/login', login);

var register = require('./routes/register');
app.use('/register', register);

var jscalculator = require('./routes/jscalculator');
app.use('/jscalculator', jscalculator);

var histor = require('./routes/history');
app.use('/history', histor);


var server = app.listen(app.get('port'), function() {
	console.log('Servidor escuchando en el puerto %s', app.get('port'));
});
