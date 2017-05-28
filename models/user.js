module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	
	var UserSchema = new Schema({
		// local: { // <--- Comentar si no se utiliza passport
			username: String,
			passwd: String,
			histor: [{
				operation: String, 
				date: { type: Date, default: Date.now}
			}]
		// },// <--- Comentar si no se utiliza passport
		
		// facebook: {
			// id: String,
			// token: String,
			// email: String,
			// name: String,
			// username: String,
		// }
	});
	
	return mongoose.model('User', UserSchema);
}

// Schema.methods.generateHash = function(password){		
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)		
//  }		
 		
//  Schema.methods.validPassword = function(password){		
//    return bcrypt.compareSync(password, this.password)		
//  }
// Definimos el nombre de nuestro modelo y exportamos
