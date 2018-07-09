const axios = require('axios');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5001 });

wss.on('connection', function connection(ws) {

  console.table(ws._socket.address());

  ws.on('message', function incoming(data) {
    var data = JSON.parse(data)
    var controller = Object.keys(data)[0];
    var payload = data[controller];
    console.table(data);
    ws.send("recieved");
    axios.post(`http://localhost:5000/api/data/${controller}`, payload);
  });

});
