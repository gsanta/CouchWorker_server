import * as Mongoose from 'mongoose';
import { DatabaseId } from '../../../repository/RepositoryBase';
import { UserDocument } from '../../../../shared/model/user/UserDocument';

export interface MongooseUserDocument extends UserDocument, Mongoose.Document, DatabaseId {
    
}