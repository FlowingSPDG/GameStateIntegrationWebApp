var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var app = require('express')();
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
const token = "Q79v5tcxVQ8u";

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/data', function(req, res){
	if(req.body.auth["token"] == token){
		res.sendStatus(200);
		io.emit('update', req.body);
		console.log('Sent update request to clients.......');
		console.log(req.body);
		//console.log(req.body.grenades);
		//console.log(req.body.grenades["158"]); // what's the key??
		//console.log('%j', req.body);
	}
	else {
		console.log("AUTH FAILED");
	}
});

io.on('connection', function(socket){
	console.log('Connection established!');
});

http.listen(3000, function(){
	console.log('Listening on localhost:3000');
});