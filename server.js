// This is the backend for the react app
// We can replace this with flask, rails, django, whatever we want

const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//var log = new Array();
//var data;
//var chat_msg_id = 0;

const pusher = new Pusher({
  appId: '541385',
  key: '459202bd6ee274316ace',
  secret: '8f6571336c2df3dd6eac',
  cluster: 'eu',
  encrypted: true
});

app.set('PORT', process.env.PORT || 5000);


app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  console.log(req.body.username.concat(": ").concat(req.body.message));
  res.send(payload);
});

app.get('/api/echo', (req, res) => {
  console.log("echo");
  res.status(200).send('echo');
});

app.post('/api/echo', (req, res) => {
  var payload = JSON.stringify(req.body);
  console.log(payload);
  res.status(200).send(payload);
});


app.get('/api/data', (req, res) => {
  console.log(data);
  res.status(200).send(data);
});

app.post('/api/data', (req, res) => {
  var id = req.body.id
  console.log(req.body);
  pusher.trigger('data', 'input', req.body.data);
  res.status(200).send(req.body);
});

app.post('/api/data/:controller', (req, res) => {
  var ctrl = req.params.controller;
  var payload = JSON.stringify(req.body);

  console.log(ctrl.concat(": ").concat(payload));
  pusher.trigger('data', ctrl, payload); // payload must be sent as a string

  var log_payload = {
    username: ctrl,
    message : payload,
  };

  //pusher.trigger('chat', 'message', log_payload);

  res.status(200).send(payload);
});

// 404
app.use(function(req, res, next){
  console.log(req);
  res.status(404).send(req);
});

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


