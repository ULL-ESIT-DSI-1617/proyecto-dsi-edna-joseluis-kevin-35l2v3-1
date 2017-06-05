"use strict";

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	
	// Inicio
	
	router.get('/', function(req, res) {
		res.render('index', { user: req.user });
	});
	
	
	// Autenticación local
	
	router.get('/login', notLoggedIn, function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	router.post('/login', notLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/jscalculator',
		failureRedirect: '/login',
		failureFlash: true,
	}));
	
	// Autenticación Facebook
	
	router.get('/auth/facebook', notLoggedIn, passport.authenticate('facebook', {
		scope: ['email']
	}));
	
	router.get('/auth/facebook/callback', notLoggedIn, passport.authenticate('facebook', {
		successRedirect: '/jscalculator',
		failureRedirect: '/login'
	}));
	
	// Autenticación Github
	
	router.get('/auth/github', notLoggedIn, passport.authenticate('github', {
		scope: ['email']
	}));
	
	router.get('/auth/github/callback', notLoggedIn, passport.authenticate('github', {
		successRedirect: '/jscalculator',
		failureRedirect: '/login'
	}));
	
	
	// Registro local
	
	router.get('/register', notLoggedIn, function(req, res) {
		res.render('register', { message: req.flash('registerMessage') });
	});
	
	router.post('/register', notLoggedIn, passport.authenticate('local-register', {
		successRedirect: '/jscalculator',
		failureRedirect: '/register',
		failureFlash: true,
	}));
	
	
	// Calculadora
	
	router.get('/jscalculator', isLoggedIn, function(req, res) {
		res.render('jscalculator');
	});
	
	router.post('/jscalculator', isLoggedIn, function(req,res) {
		var rOperation = req.body.original;
		var rValue = req.body.result;
		var oper = rOperation + " = " + rValue;
		console.log("_id: " + req.user._id);
		console.log("Operación realizada: " + oper);
		
		// Si la operación introducida es correcta...
		if (!oper.match(/ERROR/)) {
			var aux = { operation: oper };
			// Se busca el usuario por su _id y se añade la nueva operación
			db.User.findOneAndUpdate(
				{
					'_id': req.user._id
				},
				{
					$push: {'histor': aux}
				},
				function(err, model) {
					if (err) {
						console.log(err);
					}else{
						console.log("Operación guardada");
					}
				}
			);
		}
		
		res.render('jscalculator', {operacion: rOperation, resultado: rValue});
	});
	
	//Historial del usuario

	router.get('/history', isLoggedIn, function(req, res) {
		// Se busca el historial del usuario por su _id y se muestra
		db.User.findOne(
			{
				'_id': req.user._id
			},
			'histor',
			{
				sort: 'histor.date'
			},
			function (err, model) {
				if (err) {
					console.log(err);
				}
				else {
					res.render('history', { histor: model.histor });
				}
			}
		)
	});
	

	// Borrar historial
	
	router.get('/history/delete', isLoggedIn, function(req, res) {
		// Se busca el historial del usuario por su _id y se vacía
		db.User.findOneAndUpdate(
			{
				'_id': req.user._id
			},
			{
				histor: []
			},
			function (err, model) {
				if (err) {
					console.log(err);
				}
				else {
					res.redirect('/jscalculator');
				}
			}
		)
	});
	
	
	// Cierre de sesión
	
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
	return router;
};

// Middleware que comprueba que el usuario está autenticado

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	
	res.redirect('/login');
}

// Middleware que comprueba que el usuario NO está autenticado

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	
	res.redirect('/jscalculator');
}
