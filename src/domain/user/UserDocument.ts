import { DatabaseId } from '../../repository/RepositoryBase';
import { AddressDocument } from './AddressModel';
import mongoose = require("mongoose");

export interface PersonalInfoDocument {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
}

export interface UserDocument extends AddressDocument, PersonalInfoDocument, DatabaseId {
    profession: string;
}
