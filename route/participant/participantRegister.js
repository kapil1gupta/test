var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var url = 'mongodb://127.0.0.1:27017/event';
exports.addParticipant = function(req,callback){
  MongoClient.connect(url, function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req.body.participantFirstName || !req.body.participantLastName || !req.body.participantUserId || !req.body.password || !req.body.participantEmailId || !req.body.participantContactNumber)
      {
        var resJson = {
          http_code: 400,
          message: 'please fill all the mandatory fields'
        }
        return callback(false, resJson)
      }

     db.collection('counters').findOne({'_id':'participant_id'},function(err,res)
    {
      var count = res.seq
      count = count + 1
      db.collection('counters').updateOne({'_id':'participant_id'},{'seq':count},function(err,res){
        if(err)
        {
          throw err;
        }
      });

      var schema =
       {
         participantId : count,
         participantFirstName : req.body.participantFirstName,
         participantLastName : req.body.participantLastName,
         participantUserId : req.body.participantUserId,
         password : md5(req.body.password),
         participantEmailId : req.body.participantEmailId,
         participantContactNumber : req.body.participantContactNumber,
         eventRegistered: false,
         date : new Date(),
         event : [
           {
            eventId : "",
            eventTitle : "",
            eventDate : "",
            eventType : "",
            eventDescription : "",
            eventActive : true,
            artist : "",
           }
         ]
     }
      db.collection('participant').insertOne(schema, function(err,res){
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
          var resJson = {
            http_code: 200,
            message: 'Registration sucessfull'
          }
            return callback(false,resJson)
        }

      });
    })
    }
  });

};
