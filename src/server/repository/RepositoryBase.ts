import { PaginationModel } from './PaginationModel';
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

    public aggregate(aggregation: any) {
        return new Promise((resolve, reject) => {
            return this.model.aggregate(
                [
                    {'$unwind': '$addresses'},
                    {'$match': {'addresses.uuid' : 'a1b1041f-a8a7-42d2-af53-24de16b9b635'}},
                    {'$project' : {'addresses' : 1}},
                    {'$group': {'_id': '$addresses'}}
                ],
                function(err, result) {

                    console.log(result);
                }
            );
        });
    }

    public pull(base: any, nested: any) {
        return new Promise((resolve, reject) => {
            this.model.update(base, { $pull: nested }, (error: any, result: any) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public set(base: any, nested: any) {
        return new Promise((resolve, reject) => {
            this.model.update(base, { $set: nested }, (error: any, result: any) => {
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

    public findAll(pagination: PaginationModel): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model
                .find({})
                .skip(pagination.getPage() * pagination.getLimit())
                .limit(pagination.getLimit())
                .exec((error: any, result: T[]) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        });
    }

    public findByQuery(item: any, pagination: PaginationModel = new PaginationModel()): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model
                .find(item)
                .skip(pagination.getPage() * pagination.getLimit())
                .limit(pagination.getLimit())
                .exec((error: any, result: T[]) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        });
    }

    public findBy(item: T, pagination: PaginationModel): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model
                .find(item)
                .skip(pagination.getPage() * pagination.getLimit())
                .limit(pagination.getLimit())
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

    public findByText(searchString, pagination: PaginationModel): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model.find({$text: {$search: searchString}})
                .skip(pagination.getPage() * pagination.getLimit())
                .limit(pagination.getLimit())
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
