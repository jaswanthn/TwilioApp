
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/sms',function(req,res){
	var twilio = require('twilio');
	var resp = new twilio.TwimlResponse();
	resp.message('Welcome to Twilio /jaswanth');
	res.send(resp.toString());
});

http.createServer(function(request,response){
	response.writeHead(200,{statusMessage:"server Okay"},{"Content-Type":"text/plain"});
	response.write("hello. this is jaswanth");
	setTimeout(function(){
		response.write("\nprint after 5 sec");
		response.end();
		},5000);
	}).listen(8080);

