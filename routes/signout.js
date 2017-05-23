"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var configDB = require('../config/database');
mongoose.connect(configDB.url);
var User = require('../models/user');


router.get('/', function(req, res) {
	res.render('signout');
});

router.post('/', function(req, res) {
	// Comprobar registro de nuevo usuario...
	
		
	if(!req.body.username || !req.body.passwd1 || !req.body.passwd2){	//Comprobar si los campos están vacíos
		
		console.log('No has introducido todos los datos!');
		res.send('No has introducido todos los datos!');
		
	}
});

module.exports = router;
