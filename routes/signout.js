"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('signout');
});

router.post('/', function(req, res) {
	// Comprobar registro de nuevo usuario...
});

module.exports = router;
