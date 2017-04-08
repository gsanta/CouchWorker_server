import { MongooseUserDocument } from './MongooseUserDocument';
import Mongoose = require("mongoose");

export class UserSchema {
    private mInstance: Mongoose.Mongoose;
    private mConnection: Mongoose.Connection;

    constructor(mongooseInstance: Mongoose.Mongoose, mongooseConnection: Mongoose.Connection) {
        this.mInstance = mongooseInstance;
        this.mConnection = mongooseConnection;
    }

    public getModel(): Mongoose.Model<MongooseUserDocument> {
        return this.mConnection.model<MongooseUserDocument>("Users", this.getSchema());
    }

    public getSchema(): Mongoose.Schema {
        return new this.mInstance.Schema({
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            profession: {
                type: String,
                required: true
            }
        });
    }
}
