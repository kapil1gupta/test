var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var index = require('./route/index.js');
var event = require('./route/event/event.js');
var participant = require('./route/participant/participant.js');
app.use(bodyParser.json({limit: '1mb'}));

app.use('/',index);
app.use('/event', event);
app.use('/participant',participant)
//Listening port
app.listen(3000, function(){
  console.log('Listening on port 3000...');
});
