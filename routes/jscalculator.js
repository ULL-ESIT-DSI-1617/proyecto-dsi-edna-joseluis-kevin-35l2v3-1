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
	console.log("Operación realizada: " + req.body.original + " = " + req.body.result);
	
	// Guardar operación en el historial si es válida...
		var input = new Result({
			result: req.body.result,
		});

		// Guardamos en la base de datos
		input.save(function(err){
			if(err){
				console.log('ERROR');
			}else{
				console.log(input);
			}
		});
		console.log("Resultado guardado correctamente");
});

module.exports = router;
