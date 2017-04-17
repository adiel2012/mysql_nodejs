
var aUserRepository = require('../data/repositories/UserRepository');
var m_UserRepository = new aUserRepository();

module.exports = function(express,app) {
	 var router = express.Router();

	 
router.get('/users', function(req, res) { 
     console.log("index shown");	
	 m_UserRepository.list(function(err, rows){
		if(!err){	
             res.writeHead(200, {"Content-Type": "application/json"});			
			 res.write( JSON.stringify(rows) );			 
		}else{
			res.writeHead(404, {"Content-Type": "application/json"});			
			res.write( JSON.stringify(err) );	
		}
        res.end();		
    });	
 });
 
 
 router.get('/users/:username', function(req, res) {
	
	m_UserRepository.getByUserName(req.params.username,function(err, user){
		if(!err){
			if(user){
				console.log(user);
			    res.writeHead(200, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify(user) );
			}
			else{
				res.writeHead(404, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify({'message':'do not exist: '+req.params.username}) );
			}
			
			
		}else{
			res.writeHead(404, {"Content-Type": "application/json"});			
			res.write( JSON.stringify(err) );
		}
        res.end();		
    });	
});

router.delete('/users/:username', function(req, res) { 
	
	m_UserRepository.getByUserName(req.params.username,function(err, user){
		if(!err){
			console.log(user);
			
			m_UserRepository.remove(req.params.username,function (err2, result2) {
			   
				if (err) {
				   res.writeHead(404, {"Content-Type": "application/json"});			
			       res.write( JSON.stringify(err) );
                   res.end();				   
				}else{
					if(user){
						res.writeHead(200, {"Content-Type": "application/json"});			
			            res.write( JSON.stringify({result:"OK"}) );
				        res.end();
					}else{
					   res.writeHead(404, {"Content-Type": "application/json"});			
			           res.write( JSON.stringify({'message':'do not exist: '+req.params.username}) );	
					
					}
				   
				}

				console.log('Deleted ' + result2.affectedRows + ' rows');
				;
			  });
		}else{
			res.writeHead(404, {"Content-Type": "application/json"});			
			res.write( JSON.stringify(err) );
			res.end();
		}	
    });	
});
 
router.post('/users', function(req, res) {
	console.log("docreate shown");
	
	var auser = {username: req.body.username,name: req.body.name,password: req.body.password};
    console.log(auser);           
		   m_UserRepository.save(auser,function(err,res2){
		    if(err) {
				res.writeHead(404, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify(err) );
			    res.end();
				}
			else{
				res.writeHead(200, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify({result:"OK"}) );
				res.end();
			}
		    console.log('Last insert ID:', res.insertId);
		  });    
 });
  
 
 router.put('/users', function(req, res) { 
    console.log("doedit shown");
	//console.log(body);
	var ausername = req.body.username;
	console.log(ausername);
	  m_UserRepository.getByUserName(ausername,function(err, user){
		if(!err){
			
			var auser = {username: req.body.username,        name: req.body.name,       password: req.body.password    };		
			m_UserRepository.edit(auser.username,auser,function (err, numAffected) {
				  console.log("mmmmm");
							if (!err) {
							   console.log( 'notification!'+numAffected);
							   res.writeHead(200, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify({result:"OK"}) );
				res.end();
							}
							else {
							   res.writeHead(404, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify(err) );
			    res.end();
						   }
				});  
		}else{
			res.writeHead(404, {"Content-Type": "application/json"});			
			    res.write( JSON.stringify(err) );
			    res.end();
		}        		
    });
});
 
 
 
 app.use('/api', router);

  
}