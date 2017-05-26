"use strict";

var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/calculadora', function(error){
  if(error){
      throw error;
  }else{
      console.log('Conectado a MongoDB');
  }
});

var Schema = mongoose.Schema({
    // result: String,
    result: {type: String},
    date: { type: Date, default: Date.now },
});

// Schema.methods.generateHash = function(password){		
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)		
//  }		
 		
//  Schema.methods.validPassword = function(password){		
//    return bcrypt.compareSync(password, this.password)		
//  }
module.exports = mongoose.model('Result', Schema);