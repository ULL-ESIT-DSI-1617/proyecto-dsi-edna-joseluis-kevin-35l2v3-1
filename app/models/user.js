var bcrypt = require('bcrypt-nodejs');

module.exports = function(mongoose) {	
	var UserSchema = new mongoose.Schema({
		local: {
			username: String,
			passwd: String
		},
		
		facebook: {
			id: String,
			token: String,
			email: String,
			name: String,
		},
		
		github: {
			id: String,
			token: String,
			email: String,
			displayName: String,
		},
		
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
