var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var routes = require('./routes');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3001);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var connection = mysql.createConnection({
  host     : '192.99.169.9',
  port     : 3306,
  user     : 'blomqcon',
  password : '#Formics43',
  database : 'github_track'
});
connection.connect();


require('./routes/api')(app, express, connection);

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});