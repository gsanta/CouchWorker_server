import {UserModel} from "./database/UserModel";
import {UserValidator} from "./business/registration/UserValidator";
import {UserBusiness} from "./business/UserBusiness";
import {RepositoryFactory} from "./repository/RepositoryFactory";
import {UserRepository} from "./repository/UserRepository";
import {Database} from "./database/Database";
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

// MongoClient.connect(url, function(err: any, db: any) {
//   console.log("Connected successfully to server");
// });

const database = new Database("mongodb://localhost/couchworker");
const repositoryFactory = new RepositoryFactory(database.getInstance(), database.getConnection());

app.get('/listUsers', function (req: express.Request, res: express.Response) {
   fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });
});

const validator = new UserValidator();
const userRepository = repositoryFactory.getUserRepository();
const userBusiness = new UserBusiness(userRepository);

app.post('/addUser', function (req, res) {
    const userModel = validator.validateRegistration(req.body);
    userBusiness.create(userModel)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

app.post('/findUser', function (req, res) {
    const email = validator.validateEmail(req.body);
    userBusiness.findByEmail(email)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

app.post('/updateUser', function (req, res) {
    const email = validator.validateRegistration(req.body);
    userBusiness.update(email)
        .then((data: any) => {
            res.send(data)
        })
        .catch((error: any) => {
            res.send("Error: " + error);
        });
});

app.post('/deleteUser', function (req, res) {
    const email = validator.validateEmail(req.body);
    userBusiness.findByEmail(email)
        .then((user: UserModel) => {
            return userBusiness.delete(user)
        })
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
