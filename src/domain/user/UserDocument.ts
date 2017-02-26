import { DatabaseId } from '../../repository/RepositoryBase';
import mongoose = require("mongoose");

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
