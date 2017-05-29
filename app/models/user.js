var bcrypt = require('bcrypt-nodejs');

module.exports = function(mongoose) {	
	var UserSchema = new mongoose.Schema({
		local: { // <--- Comentar si no se utiliza passport
			username: String,
			passwd: String
		},// <--- Comentar si no se utiliza passport
		
		// facebook: {
			// id: String,
			// token: String,
			// email: String,
			// name: String,
			// username: String,
		// }
		
		
		histor: [{
			operation: String, 
			date: { type: Date, default: Date.now}
		}]
	});
	
	UserSchema.methods.generateHash = function(passwd){		
		return bcrypt.hashSync(passwd, bcrypt.genSaltSync(10), null)		
	}		

	UserSchema.methods.validPassword = function(passwd){		
		return bcrypt.compareSync(passwd, this.local.passwd)
	}
	
	
	return mongoose.model('User', UserSchema);
};
