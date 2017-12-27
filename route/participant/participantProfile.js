var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/event';

exports.viewParticipantProfile = function(req,callback){
  MongoClient.connect(url,function(err,db){
    if(err)
    {
      throw err
    }
    else {
      var query = {
        'participantId' : req.body.participantId
      }
      var projection = {
        '_id':0,
        'participantUserId':0,
        'password': 0
      }
      db.collection('participant').find(query,projection).toArray(function(err,result){
        if(err)
        {
          throw err
        }
        else {
          var resJson = {
            http_code : "200",
            message : result
          }
            return callback(false,resJson);
        }
      });
    }
  });
}
