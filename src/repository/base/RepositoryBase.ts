import {Write} from "./Write";
import {Read} from "./Read";
import mongoose = require("mongoose");

export class RepositoryBase<T extends mongoose.Document> implements Read<T>, Write<T> {

    protected model: mongoose.Model<mongoose.Document>;

    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this.model = schemaModel;
    }

    public create(item: T, callback: (error: any, result: any) => void) {
        this.model.create(item, callback);
    }

    public findAll(callback: (error: any, result: any) => void) {
         this.model.find({}, callback)
    }

    public update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this.model.update({_id: _id}, item, callback);
    }

    public delete(_id: string, callback:(error: any, result: any) => void) {
        this.model.remove({_id: this.toObjectId(_id)}, (err) => callback(err, null));

    }

    findById (_id: string, callback: (error: any, result: T) => void) {
        this.model.findById( _id, callback);
    }

    private toObjectId (_id: string) : mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

}
