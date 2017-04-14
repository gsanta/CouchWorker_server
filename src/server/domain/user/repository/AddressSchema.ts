
import {Mongoose} from 'mongoose';
import { AddressDocument } from '../../../../shared/model/AddressModel';

export class AddressSchema {
    private mInstance: Mongoose.Mongoose;
    private mConnection: Mongoose.Connection;

    constructor(mInstance: Mongoose.Mongoose, mConnection: Mongoose.Connection) {
        this.mInstance = mInstance;
        this.mConnection = mConnection;
    }

    public getModel(): Mongoose.Model<AddressDocument> {
        return this.mConnection.model<AddressDocument>("Address", this.getSchema());
    }

    public getSchema(): Mongoose.Schema {
        return new this.mInstance.Schema({
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
        });
    }
}