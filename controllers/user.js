
var aUserRepository = require('../data/repositories/UserRepository');
var m_UserRepository = new aUserRepository();

module.exports = function(express,app) {
	
app.get('/user/index', function(req, res) { 
    console.log("index shown");	
	 m_UserRepository.list(function(err, rows){
		if(!err){
			var models = JSON.parse(JSON.stringify(rows));			
			res.render("user/list.html",{'model': models});
		}else{
			console.log(err);
		}	
    });	
 });

app.get('/user/create', function(req, res) { 
    console.log("create get shown");
    res.render("user/create.html");	
});
   
app.post('/user/docreate', function(req, res) {
	console.log("docreate shown");
	
	var auser = {username: req.body.username,name: req.body.name,password: req.body.password};
    console.log(auser);           
		   m_UserRepository.save(auser,function(err,res2){
		    if(err) 
				console.log(err);
			else{
				res.redirect("index");	
			}
		    console.log('Last insert ID:', res.insertId);
		  });    
 });
  

app.get('/user/details/:username', function(req, res) {
	
	m_UserRepository.getByUserName(req.params.username,function(err, user){
		if(!err){
			console.log(user);
			res.render("user/details.html",{'model':user});
		}else{
			console.log(err);
		}	
    });	
});


app.get('/user/edit/:username', function(req, res) { 
    m_UserRepository.getByUserName(req.params.username,function(err, user){
		if(!err){
			console.log(user);
			res.render("user/edit.html",{'model':user});
		}else{
			console.log(err);
		}	
    });
}); 

app.post('/user/doedit', function(req, res) { 
    console.log("doedit shown");
	//console.log(body);
	var ausername = "acastano";//req.body.username;
	console.log(ausername);
	  m_UserRepository.getByUserName(ausername,function(err, user){
		if(!err){
			
			var auser = {username: req.body.username,        name: req.body.name,       password: req.body.password    };		
			m_UserRepository.edit(auser.username,auser,function (err, numAffected) {
				  console.log("mmmmm");
							if (!err) {
							   console.log( 'notification!'+numAffected);
							   res.redirect("index");
							}
							else {
							   console.log( err);
						   }
				});  
		}else{
			console.log(err);
		}        		
    });
});  
  
app.get('/user/delete/:username', function(req, res) { 
	
	m_UserRepository.getByUserName(req.params.username,function(err, user){
		if(!err){
			console.log(user);
			
			m_UserRepository.remove(req.params.username,function (err2, result2) {
			   
				if (err) {
				 console.log(err);	
				}

				console.log('Deleted ' + result2.affectedRows + ' rows');
				res.redirect("/user/index");
			  });
		}else{
			console.log(err);
		}	
    });	
});

  
  
  
  
  
}