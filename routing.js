var fs = require('fs');

module.exports = function(app) {
	
   fs.readdirSync(__dirname + '/custom_middleware/').forEach(function(name) {
    var route = require('./custom_middleware/' + name);
    route(app);
  });	
	
  fs.readdirSync(__dirname + '/controllers/').forEach(function(name) {
	  
    var route = require('./controllers/' + name);
	console.log("included ->  "+name);
    route(app);
  });
}