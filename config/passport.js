"use strict";

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'passwd1',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.username': username }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'Este usuario ya existe!'));
        } else {
          var newUser = new User();
          newUser.local.username = req.body.username;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'passwd',
        passReqToCallback: true,
    },
    function(req, username, password, done) {
        User.findOne({ 'local.username':  username }, function(err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));
        if (!user.validPassword(password)){
            return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta!'));
        }else{
            console.log('Login correcto!');
			res.render('jscalculator');
        }
        return done(null, user);
        });
    }));


};

 passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));