import { AddressDocument } from '../AddressModel';
import mongoose = require("mongoose");

export interface PersonalInfoDocument {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
}

export interface UserDocument extends PersonalInfoDocument {
    profession: string;
    uniqueIndex: number;
    addresses: AddressDocument[]
}
