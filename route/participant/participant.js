var express = require('express');
var app = express();
var addParticipant = require('./participantRegister.js');
var viewParticipant = require('./viewParticipant.js');
var viewParticipantProfile =require('./participantProfile');
var participantLogin = require('./participantLogin.js');
// register as a user
app.post('/addParticipant',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  addParticipant.addParticipant(req,callback);
});
// view participant against an event
app.post('/viewParticipant',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  viewParticipant.viewParticipant(req,callback);
});
// view participant profile
app.post('/viewParticipantProfile',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  viewParticipantProfile.viewParticipantProfile(req,callback);
});
// login for participant
app.post('/participantLogin',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  participantLogin.participantLogin(req,callback);
});
module.exports = app;
