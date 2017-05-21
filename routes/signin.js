"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('signin');
});

router.post('/', function(req, res) {
	// Comprobar inicio de sesión de usuario registrado...
});

module.exports = router;
