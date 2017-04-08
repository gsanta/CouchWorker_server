import {RepositoryFactory} from "./repository/RepositoryFactory";
import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { Database } from './repository/Database';
import { UserValidator } from './domain/user/validation/UserValidator';
import { UserBusiness } from './domain/user/UserBusiness';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { UserModel } from '../shared/model/user/UserModel';

var app = express();

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'tasmanianDevil'
};

var users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:    
    let user: any;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === jwt_payload.id) {
            user = users[i];
            break;
        }
    }
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';

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

app.post('/api/login', function (req, res) {
    res.send({
        firstName: 'New',
        lastName: 'User',
        birthDate: new Date(1980, 11, 28),
        email: 'new_user@gmail.com',
        profession: 'Drummer',
        country: 'Hungary',
        city: 'Budapest',
        id: null
    });
});

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

// app.post("/login", function(req, res) {
//     if(req.body.name && req.body.password){
//         var name = req.body.name;
//         var password = req.body.password;
//     }

//     let user: any;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].name === name) {
//             user = users[i];
//             break;
//         }
//     }
//     // usually this would be a database call:
//     if(!user){
//         res.status(401).json({message:"no such user found"});
//     }

//     if(user.password === req.body.password) {
//         // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
//         var payload = {id: user.id};
//         var token = jwt.sign(payload, jwtOptions.secretOrKey);
//         res.json({message: "ok", token: token});
//     } else {
//       res.status(401).json({message:"passwords did not match"});
//     }
// });

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
