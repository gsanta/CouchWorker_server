import { MongooseUserDocument } from './MongooseUserDocument';
import { PaginationModel } from '../../../repository/PaginationModel';
import { UserModel, toUserDocument, fromUserDocument, splitUserName } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument, toAddressDocument, fromAddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { RatingModel } from '../../../../shared/model/RatingModel';
import { ModelState } from '../../../../shared/model/ModelState';
import { UserSchema } from './UserSchema';
import * as Mongoose from 'mongoose';
import { makeAggregation } from './makeAggregation';

export class UserRepository {
    private model: Mongoose.Model<MongooseUserDocument>;
    private createUniqueId: () => string;

    constructor (model: Mongoose.Model<MongooseUserDocument>, createUniqueId: () => string) {
        this.model = model;
        this.createUniqueId = createUniqueId;
    }

    public create (user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.model.create(userDocument)
            .then(document => fromUserDocument(document));
    }

    public update(user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.model.update({uuid: user.uuid}, userDocument)
            .then(document => fromUserDocument(document));
    }

    public delete(user: UserModel): Promise<UserModel> {
        return this.model.remove({uuid: user.uuid})
            .then(() => user);
    }

    public findAddressByUuid(userName: string, uuid: string): Promise<AddressModel> {
        return this.model.aggregate(
                [
                    {$unwind: '$addresses'},
                    {$match: {'addresses.uuid' : uuid}},
                    {$project : {addresses : 1}},
                    {$group: {_id: '$addresses'}}
                ]
            )
            .then((group: any) => {
                if (group.length) {
                    return fromAddressDocument(group[0]._id);
                }

                return null;
            });
    }

    public deleteAddress(userName: string, addressUuid: string) {
        return this.findAddressByUuid(userName, addressUuid)
            .then((addressModel: AddressModel) => {
                addressModel.state = ModelState.DELETED;
                return this.updateAddress(userName, addressModel);
            });
    }

    public updateAddress(userName: string, address: AddressModel) {
        const query = {
            ...splitUserName(userName),
            'addresses.uuid': address.uuid
        };

        return this.model.update(query, { $set: { 'addresses.$': toAddressDocument(address) } });
    }

    public findAll(pagination: PaginationModel): Promise<UserModel[]> {
        return this.model
            .find({})
            .skip(pagination.getPage() * pagination.getLimit())
            .limit(pagination.getLimit())
            .exec()
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }

    public findByEmail(email: string): Promise<UserModel> {
        const userDocument = <UserDocument> {
            email: email
        };

        return this.findOneBy(userDocument)
            .then(userDocument => fromUserDocument(userDocument));
    }

    public findByUserName(userName: string): Promise<UserModel> {
        const userNameParts = userName.split('.');
        const firstName = userNameParts[0];
        const lastName = userNameParts[1];
        const uniqueIndex = userNameParts.length === 3 ? parseInt(userNameParts[2], 10) : 0;
        const userDocument = <UserDocument> {
            firstName: firstName,
            lastName: lastName,
            uniqueIndex: uniqueIndex
        };

        return this.findOneBy(userDocument)
            .then(userDocument => fromUserDocument(userDocument));
    }

    public findByText(searchString: string, pagination: PaginationModel): Promise<UserModel[]> {
        return this.model.find({$text: {$search: searchString}})
            .skip(pagination.getPage() * pagination.getLimit())
            .limit(pagination.getLimit())
            .exec()
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }

    private findOneBy(fields: UserDocument): Promise<UserDocument> {
        const aggr1 = [
            { $match: fields},
            { $unwind: '$addresses' },
            { $match: {
                $or: [
                    {'addresses.state': ModelState.ACTIVE},
                    {'addresses.state': ModelState.NEW}
                ]
            }},
            { $group: {_id: '$_id'}}
        ];

        const aggr2 = [
            { $match: fields}
        ];

        return makeAggregation<UserDocument>(aggr1, aggr2)(this.model);
    }
}
