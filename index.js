var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});


var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use("/assets",express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//app.set("view engine","jade");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


require('./routing.js')(express,app);

/*
app.get("/closedtime",function(req,res){
   console.log("it is clored");
   res.render("cerrado");		
});


var accesstime = require("./custom_middleware/houraccess");
app.use(accesstime());

app.get("/",function(req,res){
   console.log("aa2");
   res.render("index");		
});

*/

app.listen(8081);



//  http://stackoverflow.com/questions/11369089/using-separate-controllers-and-routes-in-node-js