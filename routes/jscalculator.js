"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res) {
	res.render('jscalculator');
});

router.post('/', function(req, res) {
	var oper = req.body.original + " = " + req.body.result;
	console.log("Operación realizada: " + oper);
	
	// Guardar operación en el historial si es válida...
	
	// var aux = { operation: oper };
	// db.User.findOneAndUpdate(
		// {username: 'kevin'},
		// {$push: {histor: aux}},
		// function(err, model) {
			// if (err){
				// console.log(err);
			// }
		// }
	// );
});

module.exports = router;
