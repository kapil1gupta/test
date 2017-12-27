var express = require('express');
var app = express();

app.post('/',function(req,res){
  res.send('this is index page');
});

module.exports = app;
