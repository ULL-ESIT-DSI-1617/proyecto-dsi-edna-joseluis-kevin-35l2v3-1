"use strict";

var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
		db.User.findById(id, function(err, user) {
			done(err, user);
		});
    });
	
	
	// Estrtegia local para el inicio de sesión

    passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'passwd',
			passReqToCallback: true,
		},
		function(req, username, passwd, done) {
			db.User.findOne({ 'local.username':  username }, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'Nombre de usuario incorrecto.'));
				}
				if (!user.validPassword(passwd)) {
					return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
				}
				
				return done(null, user);
			});
		}
	));
	
	// Estrategia local para el registro
	
	passport.use('local-register', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'passwd',
			passReqToCallback: true,
		},
		function(req, username, passwd, done) {
			process.nextTick(function() {
				db.User.findOne({ 'local.username': username }, function(err, user) {
					if (err) {
						return done(err);
					}
					if (user) {
						return done(null, false, req.flash('registerMessage', 'Nombre de usuario ya en uso.'));
					}
					else {
						var newUser = new db.User();
						newUser.local.username = username;
						newUser.local.passwd = newUser.generateHash(passwd);
					
						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
