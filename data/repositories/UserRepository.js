var mysql      = require('mysql');
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});*/
function UserRepository() {
	  
	  this.getConnection = function(){
		  return mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'test'
			});
		  
	  }

	  this.save = function(user,callback){
		  var connection = this.getConnection();
		    connection.connect();
		    connection.query('INSERT INTO users SET ?', user, function(err,res){
			connection.end();
			console.log("before callback");
		    callback(err,res);
			console.log("after callback");
		  });
		  
		 		  
	  }
	  
	   this.getByUserName = function(ausername,callback){
		    var connection = this.getConnection();
			connection.connect();

			connection.query('SELECT * from users where username = ?', ausername, function(err, rows, fields) {
			connection.end();
			if (!err){
				callback(err, JSON.parse(JSON.stringify(rows))[0]); 
				console.log('The solution is: ', rows);
			}
				
			else
				callback(err, null); //console.log('Error while performing Query.');
		});
		
	  }
	  
	  this.remove = function(ausername,callback){
		  var connection = this.getConnection();
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
		var connection = this.getConnection();
        connection.connect();		  
        connection.query(
		  'UPDATE users SET username = ?, name = ?, password = ? Where username = ?',
		  [user.username,user.name,user.password, ausername],
		  function (err, result) {
			  connection.end();
			if (err) throw err;
                 callback(err, result);
			console.log('Changed ' + result.changedRows + ' rows');
		  });
        }
	  
	  
	 this.list = function(callback){
		var connection = this.getConnection();
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