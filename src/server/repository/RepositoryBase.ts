import { QueryMetaData } from './QueryMetaData';
import mongoose = require("mongoose");
import { Promise } from 'es6-promise';

export interface DatabaseId {
    id: string;
}

export class RepositoryBase<T extends DatabaseId> {

    protected model: mongoose.Model<mongoose.Document>;

    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this.model = schemaModel;
    }

    public create(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.create(item, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public update(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            debugger;
            this.model.update({_id: this.toObjectId(item.id)}, item, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public delete(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.remove({_id: this.toObjectId(item.id)}, (error: any) => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });
    }

    public findAll(queryMetaData: QueryMetaData): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model
                .find({})
                .skip(queryMetaData.page * queryMetaData.limit)
                .limit(queryMetaData.limit)
                .exec((error: any, result: T[]) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        });
    }

    public findBy(item: T, queryMetaData: QueryMetaData): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model
                .find(item)
                .skip(queryMetaData.page * queryMetaData.limit)
                .limit(queryMetaData.limit)
                .exec((error: any, result: T[]) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        });
    }

    public findByEmail(email: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.findOne({email: email}, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public findByUserName(userName: string): Promise<T> {
        const userNameParts = userName.split('.');
        const firstName = userNameParts[0];
        const lastName = userNameParts[1];
        const uniqueIndex = userNameParts.length === 3 ? userNameParts[2] : 0;
        return new Promise((resolve, reject) => {
            this.model.findOne({firstName, lastName, uniqueIndex}, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public findById (_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.findById( _id, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    private toObjectId (_id: string) : mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}
