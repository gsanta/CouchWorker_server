import { AddressDocument } from '../AddressModel';
import * as Mongoose from 'mongoose';

export interface UserDocument extends Mongoose.Document {
    firstName: string;
    lastName: string;
    birthDate: Date;
    registrationDate: Date;
    email: string;
    profession: string;
    country: string;
    city: string;
    languages: string[];
    addresses: AddressDocument[]
    uniqueIndex: number;
    isActive: boolean;
    uuid: string;
}
