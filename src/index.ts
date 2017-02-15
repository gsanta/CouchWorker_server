import {UserValidator} from "./business/registration/UserValidator";
import {UserBusiness} from "./business/UserBusiness";
import {RepositoryFactory} from "./repository/RepositoryFactory";
import {UserRepository} from "./repository/UserRepository";
import {Database} from "./database/Database";
import {UserJSONParser} from "./business/registration/UserJSONParser";
import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

MongoClient.connect(url, function(err: any, db: any) {
  console.log("Connected successfully to server");

  findDocuments(db, function() {
    db.close();
  });
});

const database = new Database("mongodb://localhost/couchworker");
const repositoryFactory = new RepositoryFactory(database.getInstance(), database.getConnection());

app.get('/listUsers', function (req: express.Request, res: express.Response) {
   fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });
});

app.post('/addUser', function (req, res) {
    const parser = new UserJSONParser(req.body);
    const userRepository = repositoryFactory.getUserRepository();
    const userBusiness = new UserBusiness(userRepository);
    const userModel = parser.getUser();
    userBusiness.create(userModel)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

app.post('/findUser', function (req, res) {
    const validator = new UserValidator();
    const email = validator.validateEmail(req.body);
    const userRepository = repositoryFactory.getUserRepository();
    const userBusiness = new UserBusiness(userRepository);
    userBusiness.findByEmail(email)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

app.post('/deleteUser', function (req, res) {
    const parser = new UserJSONParser(req.body);
    const userRepository = repositoryFactory.getUserRepository();
    const userBusiness = new UserBusiness(userRepository);
    const userModel = parser.getUser();
    userBusiness.create(userModel)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});

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
