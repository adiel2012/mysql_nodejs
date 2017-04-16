function houraccess() {
	return function(req, res, next) {
	/*	var ahour = (new Date()).getHours()*1;
		console.log("hora: "+ahour);
		if(ahour>8 && ahour<23)
		{
			console.log("siguiente");
		  next();
		  }
	    else
		  res.redirect('/closedtime');*/
	  
	    //console.log('Time:', Date.now());
        //next();
      next();
  
	};
}
module.exports = houraccess;