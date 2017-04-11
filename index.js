/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
*/

var aUserRepository = require('./data/repositories/UserRepository');
var m_UserRepository = new aUserRepository();

/*
var auser = {username: 'username77',        name: 'caca',       password: 'miclave3'    };
m_UserRepository.save(auser,function(err,res){
		    if(err) throw err;

		    console.log('Last insert ID:', res.insertId);
		  });
		  */

/*
m_UserRepository.getByUserName("acastano",function(err, user){
	if(!err){
		console.log(user);
	}else{
		console.log(err);
	}	
});*/

/*
m_UserRepository.remove("username77",function (err, result) {
			   
				if (err) throw err;

				console.log('Deleted ' + result.affectedRows + ' rows');
			  });*/
			  
	  
var auser = {username: 'username134',        name: 'caca345',       password: 'miclave345'    };
m_UserRepository.edit('user1',auser,function (err, numAffected) {
  // numAffected is the number of updated documents
            if (!err) {
               console.log( 'notification!'+numAffected);
            }
            else {
               console.log( err);
           }
});  



	/*
m_UserRepository.list(function(err, user){
	console.log(user);
	console.log(err);	
});
*/


//console.log(loadUser);
console.log("aa");



/*
connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();

*/