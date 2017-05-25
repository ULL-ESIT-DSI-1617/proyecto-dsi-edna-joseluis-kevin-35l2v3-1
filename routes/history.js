"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	
	// Obtener el historial de la BBDD y renderizarlo junto con la vista
	
	res.render('history');
});

module.exports = router;
