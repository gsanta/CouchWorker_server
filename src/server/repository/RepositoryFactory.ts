import { UserRepository } from '../domain/user/repository/UserRepository';
import { MongooseUserDocument } from '../domain/user/repository/MongooseUserDocument';
import { UserSchema } from '../domain/user/repository/UserSchema';
import Mongoose = require("mongoose");
import * as uuid from 'uuid/v4';
export class RepositoryFactory {
    private userRepository: UserRepository;

    constructor(mongooseInstance: Mongoose.Mongoose, mongooseConnection: Mongoose.Connection) {
        this.userRepository = new UserRepository(
            new UserSchema(mongooseInstance, mongooseConnection).getModel(),
            uuid
        );
    }

    public getUserRepository(): UserRepository {
        return this.userRepository;
    }
}
