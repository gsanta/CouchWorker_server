import {UserDocument} from "../database/UserDocument";
import {RepositoryBase} from "./base/RepositoryBase";
import {UserSchema} from "../database/UserSchema";
import {UserRepository} from "./UserRepository";
import Mongoose = require("mongoose");

export class RepositoryFactory {
    private userRepository: UserRepository;

    constructor(mongooseInstance: Mongoose.Mongoose, mongooseConnection: Mongoose.Connection) {
        this.userRepository = new UserRepository(
            new RepositoryBase<UserDocument>(
                new UserSchema(mongooseInstance, mongooseConnection).getModel()
            )
        );
    }

    public getUserRepository(): UserRepository {
        return this.userRepository;
    }
}
