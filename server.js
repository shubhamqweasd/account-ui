
var express = require('express');
var app = express();

//View engine setup
app.set('views', __dirname);
app.use(express.static(__dirname));

app.get('/app/key.js',function(req,res){
	res.setHeader('Content-type', 'text/plain');
	res.charset = 'UTF-8';
	var content= "";

		/***************************************************Connecting URLs*********************************************************/
		content+= "var __isDevelopment = "+(process.env["CLOUDBOOST_DEVELOPMENT"] || "false")+";\n";
		content+= "var __isHosted = "+(process.env["CLOUDBOOST_HOSTED"] || "false")+";\n";
		content+= "var USER_SERVICE_URL = null,\n";
		content+= "SERVER_URL = null,\n";
		content+= "DASHBOARD_URL = null,\n";
		content+= "ACCOUNTS_URL = null,\n";
		content+= "LANDING_URL = 'https://www.cloudboost.io';\n";
		content+= "if(window.location.hostname==='accounts.cloudboost.io'){\n";
		content+= "USER_SERVICE_URL='https://service.cloudboost.io';\n";
		content+= "SERVER_DOMAIN='cloudboost.io';\n";
		content+= "SERVER_URL='https://api.cloudboost.io';\n";
		content+= "DASHBOARD_URL='https://dashboard.cloudboost.io';\n";
		content+= "ACCOUNTS_URL='https://accounts.cloudboost.io';\n";
		content+= "}else{\n";
		content+= "USER_SERVICE_URL = window.location.protocol+'//'+window.location.hostname + ':3000';\n";
		content+= "SERVER_DOMAIN= window.location.hostname;\n";
		content+= "SERVER_URL =  window.location.protocol+'//'+window.location.hostname + ':4730';\n";
		content+= "DASHBOARD_URL =  window.location.protocol+'//'+window.location.hostname + ':1440';\n";
		content+= "ACCOUNTS_URL =  window.location.protocol+'//'+window.location.hostname + ':1447';\n";
		content+= "}\n";

		res.write(content);
		res.end();
	});

//Ending
app.set('port', process.env.PORT || 1447);
var server = app.listen(app.get('port'), function() {	
	console.log("Accounts started on PORT:"+app.get('port'));
});
