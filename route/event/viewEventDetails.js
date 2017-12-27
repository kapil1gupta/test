var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/event';

exports.viewEventDetails = function(req,callback){
  MongoClient.connect(url,function(err,db){
    if(err)
    {
      throw err
    }
    else {
      var query = {
        'eventId': req.body.eventId
      }
      var projection = {
        '_id': 0
      }
      db.collection('event').find(query,projection).toArray(function(err,result){
        if(err)
        {
          throw err
        }
        else {
          var resJson = {
            http_code : "200",
            events : result

          }
            return callback(false,resJson);
        }
      });
    }
  });
}
