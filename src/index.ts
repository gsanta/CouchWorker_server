import * as express from 'express';
import * as fs from 'fs';
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err: any, db: any) {
  console.log("Connected successfully to server");

  findDocuments(db, function() {
    db.close();
  });
});


app.get('/listUsers', function (req: express.Request, res: express.Response) {
   fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});

// var insertDocuments = function(db: any, callback: any) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err: any, result: any) {
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

var findDocuments = function(db: any, callback: any) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err: any, docs: any) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
