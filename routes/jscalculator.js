"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var configDB = require('../config/database');
mongoose.connect(configDB.url);
var Result = require('../models/results');

router.get('/', function(req, res) {
	res.render('jscalculator');
});

router.post('/', function(req, res) {
	var oper = req.body.original + " = " + req.body.result;
	console.log("Operación realizada: " + oper);
	
	// Guardar operación en el historial si es válida...
	
	// var aux = { operation: oper };
	// db.User.findOneAndUpdate(
		// {username: nombreDelUsuario},
		// {$push: {historical: aux}},
		// function(err, model) {
			// if (err){
				// console.log(err);
			// }
		// }
	// );
});

module.exports = router;
