import * as Mongoose from 'mongoose';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { DatabaseId } from './DatabaseId';

export interface MongooseUserDocument extends UserDocument, Mongoose.Document, DatabaseId {
    
}