import * as Mongoose from 'mongoose';
import { UserDocument } from '../UserDocument';
import { DatabaseId } from '../../../repository/RepositoryBase';

export interface MongooseUserDocument extends UserDocument, Mongoose.Document, DatabaseId {
    
}