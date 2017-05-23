"use strict";

// LLamamos al modulo y construimos la conexion a la base de datos
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usuario', function(error){
  if(error){
      throw error;
  }else{
      console.log('Conectado a MongoDB');
  }
});
