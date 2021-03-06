"use strict";

var express = require('express'),
	app = express(),
	passport = require('passport'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');

// Conexión con la base de datos
require('./app/models');
// Configuración de passport
require('./config/passport')(passport);

app.set('port', (process.env.PORT || 8080));

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(__dirname + '/static/'));
app.use(express.static(__dirname + '/bower_components/'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(session({ secret: 'topsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


var routes = require('./app/routes')(passport);
app.use('/', routes);


var server = app.listen(app.get('port'), function() {
	console.log('Servidor escuchando en el puerto %s', app.get('port'));
});
