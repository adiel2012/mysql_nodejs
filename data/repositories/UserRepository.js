var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
function UserRepository() {
	  

	  this.save = function(user,callback){
		    connection.connect();
		    connection.query('INSERT INTO users SET ?', user, function(err,res){
			connection.end();
		    callback(err,res);
		  });
		  
		  
		  /*user.save(function (err) {
             callback(err);               
         });*/		  
	  }
	  
	   this.getByUserName = function(ausername,callback){
		   
			connection.connect();

			connection.query('SELECT * from users where username = ?', ausername, function(err, rows, fields) {
			connection.end();
			if (!err){
				callback(err, rows[0]); 
				console.log('The solution is: ', rows);
			}
				
			else
				callback(err, null); //console.log('Error while performing Query.');
		});
		   
		 /* User.find({username:ausername}, function(err, user) {	      
		     callback(err, user);
          });*/
	  }
	  
	  this.remove = function(ausername,callback){
		    connection.connect();
			connection.query(
			  'DELETE FROM users WHERE username = ?',
			  ausername,
			  function (err, result) {
				  connection.end();
				  callback(err, result);
			  }
			);
	  
		  //User.remove({ username: ausername }, callback);		  
	  }
	  
	  this.edit = function(ausername,user,callback){
        connection.connect();		  
        connection.query(
		  'UPDATE users SET username = ?, name = ?, password = ? Where username = ?',
		  [user.username,user.name,user.password, ausername],
		  function (err, result) {
			  connection.end();
			if (err) throw err;

			console.log('Changed ' + result.changedRows + ' rows');
		  }
		);

	  
		  //User.update({username:ausername},  { name: user.name, username : user.username, password : user.password  }, { multi: true }, callback);		  
	  }
	  
	  
	 this.list = function(callback){
		 
		connection.connect();

		connection.query('SELECT * from users', function(err, rows, fields) {
		  connection.end();
		  if (!err)
			callback(err, rows); //console.log('The solution is: ', rows);
		  else
			console.log('Error while performing Query.');
		});
	  
	 };
	
	 
}
module.exports =  UserRepository;