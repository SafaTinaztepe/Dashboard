// This is the backend for the react app
// We can replace this with flask, rails, django, whatever we want

// ============== Imports =============== //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const mysql = require('mysql');
// ====================================== //

// ============== Database ============== //
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'web_client',
  password: 'web_client',
  database: 'motor'
});
connection.connect();
//https://expressjs.com/en/guide/database-integration.html#mysql
// ====================================== //


// ============== Private =============== //
function getTableFromController(ctrl){
  var table;
  switch(ctrl) {
    case 'controller': table = 'Controller'; break;
    case 'pdu'       : table = 'PduController'; break;
    case 'motorsb'   : table = 'MotorSb'; break;
    case 'motorbb'   : table = 'MotorBb'; break;
  }
  return table;
}
// ====================================== //



// ============== Server ================ //
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('PORT', process.env.PORT || 5000);
// ====================================== //

// ============== GET Requests ================ //

app.get('/api/echo', (req, res) => {
  console.log("echo");
  res.status(200).send('echo');
});

app.get('/api/data/:controller', (req, res) => {
  var table = getTableFromController(req.params.controller);
  var sql = `SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`;
  connection.query(sql, function(err, result){
    if(err) console.log(err);
    res.status(200).send(result[0]);
  });
});
// ====================================== //


// ============== POST Requests ================ //

app.post('/api/echo', (req, res) => {
  var payload = JSON.stringify(req.body);
  console.log(`echo: ${payload}`);
	io.sockets.emit('echo', payload);
  res.status(200).send(payload);
});

app.post('/api/data/:controller', (req, res) => {
  var ctrl = req.params.controller;
  var table = getTableFromController(ctrl);
	var sql;
	var values = [];
	if(req.body instanceof Array){
		req.body.map(row => {
			var payload = JSON.stringify(row);
			console.log(`${ctrl}: ${payload}`);
			io.sockets.emit(ctrl, payload);
			sql = `INSERT INTO ${table} (${Object.keys(row)}) VALUES ?`;
			values.push(Object.keys(row).map(function(_){return row[_]}));
		});
	} else {
		var payload = JSON.stringify(req.body);
		console.log(`${ctrl}: ${payload}`);
		io.sockets.emit(ctrl, payload);
		sql = `INSERT INTO ${table} (${Object.keys(req.body)}) VALUES (?)`;
		values = Object.keys(req.body).map(function(_){return req.body[_]});
	}

  connection.query(sql, [values], function(err, result){
    if(err) console.log(err);
  });

  res.status(200).send(req.body);
});
// ====================================== //


app.use('*', function(req,res){
	res.status(404).send("Not Found");
});

server.listen(app.get('PORT'), function(){
	console.log('Listening at ' + app.get('PORT'));
});

process.on('exit', function() {
  console.log("About to exit");
  connection.end();
});
