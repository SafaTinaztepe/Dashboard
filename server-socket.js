var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = 5000;

server.listen(PORT);

app.get('/api/echo', function (req, res) {
  console.log("echo");
  res.send("echo");
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


console.log("Listening on ${PORT}");
