import mongoose = require("mongoose");
import {DatabaseId} from '../repository/base/RepositoryBase';

export interface UserDocument extends DatabaseId {
    name: string;
    age: number;
    profession: string;
    email: string;
}
