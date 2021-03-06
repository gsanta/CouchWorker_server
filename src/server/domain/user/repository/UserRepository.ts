import { MongooseUserDocument } from './MongooseUserDocument';
import { PaginationModel } from '../../../repository/PaginationModel';
import { UserModel, toUserDocument, fromUserDocument, splitUserName } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument, toAddressDocument, fromAddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { RatingModel } from '../../../../shared/model/RatingModel';
import { ModelState } from '../../../../shared/model/ModelState';
import { UserSchema } from './UserSchema';
import * as Mongoose from 'mongoose';

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

    public findAddressByUuid(userUuid: string, addressUuid: string): Promise<AddressModel> {
        return this.model.aggregate(
                [
                    {$unwind: '$addresses'},
                    {$match: {'addresses.uuid' : addressUuid}},
                    {$project : {addresses : 1}},
                    {$group: {_id: '$addresses'}}
                ]
            )
            .then((group: any) => group.length ? fromAddressDocument(group[0]._id) : null);
    }

    public deleteAddress(userUuid: string, addressUuid: string) {
        const query = {
            uuid: userUuid
        };

        return this.model.update(query, { $pull: { addresses: {uuid: addressUuid} } });
    }

    public updateAddress(userUuid: string, address: AddressModel) {
        const query = {
            uuid: userUuid,
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
            .then(userDoc => fromUserDocument(userDoc));
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
            .then(userDoc => fromUserDocument(userDoc));
    }

    public findUuidForUser(userName: string): Promise<string> {
        const query = {
            ...splitUserName(userName)
        };

        return this.model.findOne(query, 'uuid')
            .then(user => user.uuid);
    }

    public findByText(searchString: string, pagination: PaginationModel): Promise<UserModel[]> {
        const aggr1 = [
            {$match: {$text: {$search: searchString}}},
            {$skip: pagination.getPage() * pagination.getLimit()},
            {$limit: pagination.getLimit()}
        ];

        return <any> this.model.aggregate(...aggr1)
            .then(users => users.map((user: any) => fromUserDocument(user)));
    }

    private findOneBy(fields: UserDocument): Promise<UserDocument> {
        const aggr1 = [
            { $match: fields}
        ];

        return <Promise<UserDocument>> this.model.aggregate(...aggr1)
            .then(users => users.length ? users[0] : null);
    }
}
