import { AddressDocument } from '../AddressModel';
import * as Mongoose from 'mongoose';

export interface UserDocument extends Mongoose.Document {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    profession: string;
    uniqueIndex: number;
    uuid: string;
    addresses: AddressDocument[]
}
