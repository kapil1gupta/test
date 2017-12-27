var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var url = 'mongodb://127.0.0.1:27017/event';
exports.participantLogin = function(req,callback){
  MongoClient.connect(url, function(err,db){
    if(err)
    {
      throw err;
    }
    else
    {
      if(!req.body.participantUserId || !req.body.password)
      {
        var resJson = {
          http_code: 400,
          message: 'please fill all the mandatory fields'
        }
        return callback(false, resJson);
      }
      var query = {
        "participantUserId": req.body.participantUserId,
        "password": md5(req.body.password)
      }
     db.collection('participant').findOne(query,function(err,res){
        if(err)
        {
          throw err
        }
        if(res == null)
        {
          var resJson = {
            http_code : 500,
            message : "userid/password is not correct"
          }
          return callback(false,resJson);
        }
        else {
          var resJson = {
            http_code: 200,
            message: 'Login sucessfull'
          }
            return callback(false,resJson);
        }
      });
    }
  });
}
