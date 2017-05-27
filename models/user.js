"use strict";

var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

//Conexion a la base de datos
mongoose.connect('mongodb://localhost/calculadora', function(error){
  if(error){
      throw error;
  }else{
      console.log('Conectado a MongoDB');
  }
});

//Creamos el esquema de la Base de datos
var Schema = mongoose.Schema({
    // local: { // <--- Comentar si no se utiliza passport
    username: String,
    password: String,
	histor: [{
		operation: String, 
		date: { type: Date, default: Date.now}
	}]
//   },// <--- Comentar si no se utiliza passport

//   facebook: {
//     id: String,
//     token: String,
//     email: String,
//     name: String,
//     username: String,
//   },
});

// Schema.methods.generateHash = function(password){		
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)		
//  }		
 		
//  Schema.methods.validPassword = function(password){		
//    return bcrypt.compareSync(password, this.password)		
//  }
// Definimos el nombre de nuestro modelo y exportamos
module.exports = mongoose.model('User', Schema);
