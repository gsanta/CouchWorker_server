import {UserDocument} from "./UserDocument";
import Mongoose = require("mongoose");

export class UserSchema {
    private mInstance: Mongoose.Mongoose;
    private mConnection: Mongoose.Connection;

    constructor(mongooseInstance: Mongoose.Mongoose, mongooseConnection: Mongoose.Connection) {
        this.mInstance = mongooseInstance;
        this.mConnection = mongooseConnection;
    }

    public getModel(): Mongoose.Model<UserDocument> {
        return this.mConnection.model<UserDocument>("Users", this.getSchema());
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
