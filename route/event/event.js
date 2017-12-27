var express = require('express');
var app = express();
var addEvent = require('./addEvent.js');
var viewEvent = require('./viewEvent.js');
var viewEventDetails = require('./viewEventDetails.js');
var registerEvent = require('./registerEvent.js');
// To insert the details of the customer

// To insert the details of the customer
// To insert the details of the customer
app.post('/addEvent',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  addEvent.eventDetails(req,callback);
});
// List of all events
app.post('/listEvent',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  viewEvent.viewEvent(req,callback);
});
// Details of event
app.post('/eventDetails',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  viewEventDetails.viewEventDetails(req,callback);
});
// register for an event
app.post('/registerToEvent',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  registerEvent.registerEvent(req,callback);
});
// To insert the details of the customer
module.exports = app;
