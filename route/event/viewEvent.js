var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/event';

exports.viewEvent = function(req,callback){
  MongoClient.connect(url,function(err,db){
    if(err)
    {
      throw err
    }
    else {
      itemsPerPage = req.body.itemsPerPage;
      pageNumber = req.body.pageNumber;
      db.collection('student').find({},{'_id':0}).toArray(function(err,result){
        if(err)
        {
          throw err
        }
        else {
          var resJson = {
            http_code : "200",
            EventCount : result.length,
            CurrentPageNumber :pageNumber,
            ItemsPerPage : itemsPerPage,
            events : result.splice(itemsPerPage*pageNumber,itemsPerPage)

          }
            return callback(false,resJson);
        }
      });
    }
  });
}
