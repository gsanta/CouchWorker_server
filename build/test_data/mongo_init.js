var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/couchworker';

var insertDocument = function(db, callback) {
   db.collection('Users').insertOne( {
        firstName: "Gergely",
        lastName: "Santa",
        uniqueIndex: 0,
        email: "santagergely90@gmail.com",
        profession: "Software Developer",
        country: "Hungary",
        city: "Budapest",
        languages: [
            "Hungarian",
            "English"
        ],
        birthDate: null,
        registrationDate: null,
        uuid: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
        isActive: true,
        addresses: [
            {
                country: "Hungary",
                city: "Budapest",
                street: "Haller",
                house: "15, fsz 10.",
                uuid: "6c84fb90-12c4-11e1-840d-7b25c5ee775",
                images: [
                    {
                        fileName: "house_pic1",
                        extension: "png",
                        uuid: "2a90dbc4-d1bf-4ea5-86b2-affb670f202f",
                        src: null 
                    }
                ],
                state: 1
            }
        ]
   }, function(err, result) {
        assert.equal(err, null);
        callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});