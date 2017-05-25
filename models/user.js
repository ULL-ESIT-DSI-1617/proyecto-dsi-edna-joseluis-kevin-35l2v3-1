"use strict";

var mongoose = require('mongoose');

//Conexion a la base de datos
mongoose.connect('mongodb://localhost/usuario', function(error){
  if(error){
      throw error;
  }else{
      console.log('Conectado a MongoDB');
  }
});

//Creamos el esquema de la Base de datos
var Schema = mongoose.Schema({
    // local: {
    username: String,
    password: String,
//   },
//   facebook: {
//     id: String,
//     token: String,
//     email: String,
//     name: String,
//     username: String,
//   },
});

// Definimos el nombre de nuestro modelo y exportamos
module.exports = mongoose.model('User', Schema);
