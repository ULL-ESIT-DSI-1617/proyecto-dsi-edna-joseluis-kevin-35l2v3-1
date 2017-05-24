"use strict";

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
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
		
	}else if(req.body.username){
		if(req.body.passwd1 == req.body.passwd2){
			User.findOne({username:req.body.username}, function (err, result){
				if(result == null){
					//Poner el codigo para insertar usuario en la base de datos

					var input = new User({
						username: req.body.username,
						password: bcrypt.hashSync(req.body.passwd1),
					});

					// Guardamos en la base de datos
					input.save(function(err){
						if(err){
							console.log('ERROR');
						}else{
							console.log(input);
						}
					});
					console.log("Registrado correctamente");
			res.render('jscalculator');
				}
				if(result){
					console.log(result);
					console.log('Username ya Registrado!');
					res.send('Username ya Registrado!')
				}
			});
		}else{
			res.send("Las contraseñas no coinciden");
		}
	}
});

module.exports = router;