import {RepositoryBase} from "./RepositoryBase";
import { UserRepository } from '../domain/user/repository/UserRepository';
import { MongooseUserDocument } from '../domain/user/repository/MongooseUserDocument';
import { UserSchema } from '../domain/user/repository/UserSchema';
import Mongoose = require("mongoose");

export class RepositoryFactory {
    private userRepository: UserRepository;

    constructor(mongooseInstance: Mongoose.Mongoose, mongooseConnection: Mongoose.Connection) {
        this.userRepository = new UserRepository(
            new RepositoryBase<MongooseUserDocument>(
                new UserSchema(mongooseInstance, mongooseConnection).getModel()
            )
        );
    }

    public getUserRepository(): UserRepository {
        return this.userRepository;
    }
}
