import { QueryMetaData } from './QueryMetaData';
import mongoose = require("mongoose");
import * as Mongoose from 'mongoose';


export interface DatabaseId {
    id: string;
}

export class RepositoryBase<T extends {uuid: string}> {

    protected model: Mongoose.Model<mongoose.Document>;

    constructor (schemaModel: Mongoose.Model<mongoose.Document>) {
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
            this.model.update({uuid: item.uuid}, item, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public delete(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.remove({uuid: item.uuid}, (error: any) => {
                if (error) {
                    reject(error);
                }

                resolve(null);
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

    public findOneBy(fields: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.findOne(fields, (error: any, result: T) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public findByText(searchString: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model.find({$text: {$search: searchString}})
                .exec(function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
        });
    }

    private toObjectId (_id: string) : Mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}
