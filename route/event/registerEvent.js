var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var url = 'mongodb://127.0.0.1:27017/event';
exports.registerEvent = function(req,callback){
  MongoClient.connect(url, function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req.body.eventId || !req.body.eventTitle || !req.body.eventDate || !req.body.eventType || !req.body.eventDescription || !req.body.participantId)
      {
        var resJson = {
          http_code: 400,
          message: 'please fill all the mandatory fields'
        }
        return callback(false, resJson)
      }
       var schema =
        {
          "eventRegistered" : true,
          event : [
            {
             "eventId" : req.body.eventId,
             "eventTitle" : req.body.eventTitle,
             "eventDate" : new Date(req.body.eventDate),
             "eventType" : req.body.eventType,
             "eventDescription" : req.body.eventDescription,
             "eventActive" : true,
             "artist" : req.body.artist,
            }
          ]
        }
      var query1 = {
        "participantId" : req.body.participantId,
      }
      db.collection('participant').findOne(query1,function(err,res){
        if(res == null)
        {
          var resJson = {
            http_code: 500,
            message : "invalid participant"
          }
          return callback(false,resJson);
        }
        eventRegistered = res.eventRegistered;
        if(eventRegistered == false)
        {

              db.collection('participant').updateOne(query1,{$set: schema},function(err,res){
                if(err)
                {
                  if(err.code === 11000)
                  {
                    var resJson = {
                      http_code: 400,
                      message : 'mobile number or email is duplicate'
                    }
                    return callback(true, resJson);
                  }

                }
                else {
                  db.collection('counters').findOne({'_id':'attender_id'},function(err,res){
                   var count = res.seq
                   count = count + 1
                  db.collection('counters').updateOne({'_id':'attender_id'},{'seq':count},function(err,res){
                    if(err)
                    {
                      throw err;
                    }
                  });
                  var resJson = {
                    http_code: 200,
                    message: 'Registration sucessfull',
                    eventAttendNumber : count
                  }
                    return callback(false,resJson);
                });
              }
            });
  }
  else {
    var resJson = {
      http_code : 500,
      message : "you have already registered for the event."
    }
    return callback(false,resJson);
  }
    });
   }
 });
}
