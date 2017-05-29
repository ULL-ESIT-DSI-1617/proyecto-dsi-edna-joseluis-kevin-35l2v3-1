"use strict";

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('index');
	});
	
	
	router.get('/login', notLoggedIn, function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});
	
	router.post('/login', notLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/jscalculator',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	
	router.get('/auth/facebook', notLoggedIn, passport.authenticate('facebook', {
		scope: ['email']
	}));
	
	router.get('/auth/facebook/callback', notLoggedIn, passport.authenticate('facebook', {
		successRedirect: '/jscalculator',
		failureRedirect: '/login'
	}));
	
	
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
		failureFlash: true
	}));
	
	
	router.get('/jscalculator', isLoggedIn, function(req, res) {
		res.render('jscalculator');
	});
	
	router.post('/jscalculator', isLoggedIn, function(req, res) {
		var oper = req.body.original + " = " + req.body.result;
		console.log("Operación realizada: " + oper);
		console.log(req.user.local.username);
		console.log(req.user._id);
		
		if (!oper.match(/ERROR/)) {
			var aux = { operation: oper };
			db.User.findOneAndUpdate(
				{'_id': req.user._id},
				{$push: {'histor': aux}},
				function(err, model) {
					if (err){
						console.log(err);
					}
				}
			);
		}
	});
	

	router.get('/history', isLoggedIn, function(req, res) {
		res.render('history');
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
