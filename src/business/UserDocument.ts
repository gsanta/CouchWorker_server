import mongoose = require("mongoose");
import {DatabaseId} from '../repository/base/RepositoryBase';

export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
}

export interface UserDocument extends DatabaseId {
    name: string;
    age: number;
    profession: string;
    email: string;
    address: AddressDocument;
}
