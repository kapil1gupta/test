var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/event';

exports.eventDetails = function(req,callback){
  MongoClient.connect(url,function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req.body.eventTitle || !req.body.eventDate || !req.body.eventDescription || !req.body.organizer.organizerName || !req.body.organizer.organizerContactNumber || !req.body.organizer.organizerEmail || !req.body.eventType)
      {
        var resJson = {
          http_code : "400",
          message : "please fill all the mandatory filed"
        }
        return callback(false,resJson);
      }
      db.collection('counters').findOne({'_id':'event_id'},function(err,res){
        var count = res.seq
        count = count + 1
      db.collection('counters').findOne({'_id':'organizer_id'},function(err,res){
        var count1 = res.seq
        count1 = count1 + 1
        db.collection('counters').updateOne({'_id':'event_id'},{'seq': count},function(err,res){
          if(err)
          {
            throw err
          }
          else {
            console.log('sucessfully updated');
          }
        });
        db.collection('counters').updateOne({'_id':'organizer_id'},{'seq': count1},function(err,res){
          if(err)
          {
            throw err
          }
          else {
            console.log('sucessfully updated');
          }
        });
        var schema = {
                  eventId : count,
                  eventTitle : req.body.eventTitle,
                  date : new Date(),
                  eventDate : new Date(req.body.eventDate),
                  eventType  : req.body.eventType,
                  eventDescription : req.body.eventDescription,
                  eventActive : true,
                  artist : req.body.artist,
                  organizer: {
                      organizerId : count1,
                      organizerName : req.body.organizer.organizerName,
                      organizerContactNumber : req.body.organizer.organizerContactNumber,
                      organizerEmail : req.body.organizer.organizerEmail
                    }

                  }
        db.collection('student').insertOne(schema,function(err,res){
          if(err)
          {
            throw err
          }
          else {
             var resJson = {
               http_code: 200,
               message: 'sucessfully inserted'
             }
               return callback(false,resJson)
           }
        });
      });
    });
  }
});
}
