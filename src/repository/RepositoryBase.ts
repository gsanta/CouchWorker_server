import {Write} from "./Write";
import {Read} from "./Read";
import mongoose = require("mongoose");

export interface DatabaseId {
    id: string;
}

export class RepositoryBase<T extends DatabaseId> implements Read<T>, Write<T> {

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

    public findAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.model.find({}, (error: any, result: T[]) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    public update(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.model.update({_id: this.toObjectId(item.id)}, (error: any, result: T) => {
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
