"use strict";

var express = require('express');
var router = express.Router();


var configDB = require('../config/database');
mongoose.connect(configDB.url);
var User = require('../models/user');
var mongoose = require('mongoose');

router.get('/', function(req, res) {
	res.render('signin');
});

router.post('/', function(req, res) {
	// Comprobar inicio de sesión de usuario registrado...
	if(!req.body.username || !req.body.passwd){

		console.log('No has introducido tus datos!');

	}else{
			User.findOne({username:req.body.username, password : req.body.passwd}, function (err, result){
					if(result !== null){
							console.log('Login correcto!');
							res.render('jscalculator');
						}else{
							User.findOne({username:req.body.username}, function (err, result){
									if(result == null){
										alert("No existe el usuario");
									}else{
										alert("Contraseña Incorrecta");
									}
						});
					}
			});
	}


});

module.exports = router;
