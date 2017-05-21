"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('jscalculator');
});

router.post('/', function(req, res) {
	console.log("Operación realizada: " + req.body.original + " = " + req.body.result);
	
	// Guardar operación en el historial si es válida...
});

module.exports = router;
