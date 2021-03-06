import {RepositoryFactory} from './repository/RepositoryFactory';
import * as express from 'express';
// import * as fs from 'fs';
import * as fs from 'mz/fs';
import * as bodyParser from 'koa-bodyparser';
import { Database } from './repository/Database';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { UserModel } from '../shared/model/user/UserModel';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';
import koaBody = require('koa-body');
import * as asyncBusboy from 'async-busboy';
// import {Promise} from 'es6-promise';
import { profileApi } from './rest/profileApi';
import { ImageRepository } from './domain/user/ImageRepository';
import { config } from './config/Config';
import * as url from 'url';
const app = new Koa();
const router = new Router();

const baseDir = 'static/'; //process.argv[2];
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

// app.use(passport.initialize());
app.use(bodyParser());

var MongoClient = require('mongodb').MongoClient;
const mongoUrl = url.format({
    protocol: 'mongodb://',
    hostname: 'localhost',
    port: config.DATABASE_PORT.toString(),
    pathname: '/couchworker'
})

const database = new Database(mongoUrl);
const repositoryFactory = new RepositoryFactory(database.getInstance(), database.getConnection());

router.get('/listUsers', function (req: express.Request, res: express.Response) {
    try {
        const file = fs.readFile( __dirname + "/../" + "users.json", 'utf8');
        res.end(file); 
    } catch (e) {
        res.end('Error reading file.');
        console.error(e);
    }
});

const userRepository = repositoryFactory.getUserRepository();
const imageRepository = new ImageRepository();

profileApi(router, baseDir, userRepository, imageRepository);

router.post('/api/login', async (ctx) => {
    ctx.body = {
        firstName: 'New',
        lastName: 'User',
        birthDate: new Date(1980, 11, 28),
        email: 'new_user@gmail.com',
        profession: 'Drummer',
        country: 'Hungary',
        city: 'Budapest',
        id: null
    };
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

// app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//     res.json("Success! You can not see this without a token");
// });

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(router.routes());
app.use(koaStatic('./static'));

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
