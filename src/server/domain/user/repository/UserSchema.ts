import { MongooseUserDocument } from './MongooseUserDocument';
import { AddressSchema } from './AddressSchema';
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
        const addressSchema = new AddressSchema(this.mInstance, this.mConnection);
        return new this.mInstance.Schema({
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            uniqueIndex: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            profession: {
                type: String,
                required: false
            },
            addresses: [
            {
                country: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                street: {
                    type: String,
                    required: false
                },
                house: {
                    type: String,
                    required: false
                }
            }
            ]
        });
    }
}
