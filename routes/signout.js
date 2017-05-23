"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var configDB = require('../config/database');
mongoose.connect(configDB.url);
var User = require('../models/user');


router.get('/', function(req, res) {
	res.render('signout');
});

router.post('/', function(req, res) {
	// Comprobar registro de nuevo usuario...
});

module.exports = router;
