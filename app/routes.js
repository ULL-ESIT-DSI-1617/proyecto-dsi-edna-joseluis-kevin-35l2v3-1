"use strict";

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('index', { user: req.user });
	});
	
	
	router.get('/login', notLoggedIn, function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});
	
	// Autenticación local

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
	
	
	router.get('/register', notLoggedIn, function(req, res) {
		res.render('register', { message: req.flash('registerMessage') });
	});
	
	router.post('/register', notLoggedIn, passport.authenticate('local-register', {
		successRedirect: '/jscalculator',
		failureRedirect: '/register',
		failureFlash: true,
	}));
	
	
	router.get('/jscalculator', isLoggedIn, function(req, res) {
		res.render('jscalculator');
	});
	
	router.post('/jscalculator', isLoggedIn, function(req,res) {
		var oper = req.body.original + " = " + req.body.result;
		console.log("Operación realizada: " + oper);
		console.log(req.user.local.username);
		console.log(req.user._id);
		var rValue = req.body.result;
		
		// Actualizamos el historial del usuario añadiendo la nueva operacion

		if (!oper.match(/ERROR/)) {
			var aux = { operation: oper };
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
						res.render('jscalculator', {resultado: rValue});
					
					}
				}
			);
		}
		
		
	});
	
	//Historial del usuario

	router.get('/history', isLoggedIn, function(req, res) {
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

	// Borrando historial
	
	router.get('/history/delete', isLoggedIn, function(req, res) {
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
	
	
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
	return router;
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	
	res.redirect('/login');
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	
	res.redirect('/jscalculator');
}
