var mysql = require('mysql');
var express = require('express');
var route = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123123ms',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//-----------------------------------------------

app.get('/', function(request, response){
    console.log('GET request received at /') 
    connection.query("SELECT * FROM thread", function (err, result) {
        if (err) throw err;
        else{
	    var dataset = ""; 
		for (let i=0; i<result.length;i++){// the result array store all the info from mysql database
			dataset = dataset + "<tr><th>Thread Name: " + result[i].thread_name + "</th><th> User name: "+ result[i].User_name + " </th><th>User comment: " + result[i].User_comment + "</th><th>Thread Data: " + result[i].t_date +"</th><th><a href='/nextthread?id="+ result[i].thread_id +"' id='"+ result[i].thread_id +"'>"+result[i].thread_name +"</th></tr>";

		}
            
            response.send("<!DOCTYPE html><html><head><meta charset='utf-8'><title>Server Response</title><style>table {border-collapse: collapse; width: 100%;} th, td {text-align: left;padding: 8px;} tr:nth-child(even) {background-color: #f2f2f2;}h1 {text-align: center;color: #000000;font-size: 24px;padding: 20px 0 20px 0;} body {background-color: #cccccc; background-repeat: no-repeat; background-attachment: fixed; background-size: cover;}</style></head><body><h1> This page was render directly from the server <p>Hello there welcome to my website</p><table>"+ dataset +"</table></h1></body></html>");
	    response.end();
        }

    });
});



//-----------------------------------------------

app.get('/nextthread', function(request, response) {
    var nextthread = parseInt(request.query.id);
    connection.query('SELECT * FROM thread WHERE thread_id = ?',[nextthread], function (err, result, fields) {// use data without space to seach info
        if (err) throw err;
	else{
	    var dataset = ""; 
		for (let i=0; i<result.length;i++){// the result array store all the info from mysql database
		     dataset = dataset + "<tr><th>Thread Name: " + result[i].thread_name + "</th><th> User name: "+ result[i].User_name + " </th><th>User comment: " + result[i].User_comment + "</th><th>Thread Data: " + result[i].t_date +"</th><th><a href='/nextthread?id="+ result[i].thread_id +"' id='"+ result[i].thread_id +"'>"+result[i].thread_name +"</th></tr>";

		}
            
            response.send("<!DOCTYPE html><html><head><meta charset='utf-8'><title>Server Response</title><style>table {border-collapse: collapse; width: 100%;} th, td {text-align: left;padding: 8px;} tr:nth-child(even) {background-color: #f2f2f2;}h1 {text-align: center;color: #000000;font-size: 24px;padding: 20px 0 20px 0;} body {background-color: #cccccc; background-repeat: no-repeat; background-attachment: fixed; background-size: cover;}</style></head><body><h1> This page was render directly from the server <p>Hello there welcome to my website</p><table>"+ dataset +"</table></h1></body></html>");
	    response.end();
	}
    });   
});
app.listen(8080);