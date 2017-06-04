if (!global.hasOwnProperty('db')) {
	var mongoose = require('mongoose');
	var dbUrl = require('../../config/database').url;
	
	// Realizamos la conexion
	mongoose.connect(dbUrl, (err)=> {
		if (err) {
			console.log("Error: Check if mongod is running!!");
			console.log(err);
			throw err;
		}
		console.log("Connected to MongoDB");
	});
	
	
	global.db = {
		mongoose: mongoose,
		
		User: require('./user')(mongoose)
	};
}

module.exports = global.db;
