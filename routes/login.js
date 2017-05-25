"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var configDB = require('../config/database');
mongoose.connect(configDB.url);
var User = require('../models/user');

router.get('/', function(req, res) {
	res.render('login');
});

router.post('/', function(req, res) {
	// Comprobar inicio de sesión de usuario registrado...
	if(!req.body.username || !req.body.passwd){

		console.log('No has introducido tus datos!');

	}else{
			User.findOne({username:req.body.username}, function (err, result){
					if(result !== null){

							let rs = result.validPassword(req.body.passwd1,result.password);
							console.log(ls);

							if (result.username == req.body.username && rs == true){

								// console.log('Login correcto!');
								// res.render('jscalculator');
							}
						}else{
							User.findOne({username:req.body.username}, function (err, result){
									if(result == null){
										console.log("Registrate primero para acceder");    
										res.render('register', { header: "ERROR",
							   			message: "ERROR usuario no registrado" });
									}
						});
					}
			});
	}


});

module.exports = router;
