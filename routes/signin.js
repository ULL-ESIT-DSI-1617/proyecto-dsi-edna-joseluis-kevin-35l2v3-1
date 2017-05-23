"use strict";

var express = require('express');
var router = express.Router();


var configDB = require('../config/database');
mongoose.connect(configDB.url);
var User = require('../models/user');

router.get('/', function(req, res) {
	res.render('signin');
});

router.post('/', function(req, res) {
	// Comprobar inicio de sesión de usuario registrado...
	if(!req.body.username || !req.body.passwd){

		console.log('No has introducido tus datos!');

	}else{
							//Buscamos en la base de datos
				});
			}
		});
	}


});

module.exports = router;
