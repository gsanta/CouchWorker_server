import { MongooseUserDocument } from './MongooseUserDocument';
import { PaginationModel } from '../../../repository/PaginationModel';
import { UserModel, toUserDocument, fromUserDocument, splitUserName } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument, toAddressDocument, fromAddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { RatingModel } from '../../../../shared/model/RatingModel';
import { ModelState } from '../../../../shared/model/ModelState';
import { UserSchema } from './UserSchema';
import * as Mongoose from 'mongoose';
import { makeAggregation, takeOne } from './makeAggregation';

const getActiveAddressesFilter = () => {
    const user = new UserModel();
    let resultProps: UserDocument = {
        firstName: null,
        lastName: null,
        birthDate: null,
        registrationDate: null,
        email: null,
        profession: null,
        country: null,
        city: null,
        languages: null,
        addresses: null,
        uniqueIndex: null,
        isActive: null,
        uuid: null
    };

    Object.keys(resultProps).forEach((key: string) => {
        resultProps[key] = `$${key}`;
    });

    (<any> resultProps)._id = '$_id';
    delete resultProps.addresses;

    return [
        { $unwind: '$addresses' },
        { $match: {
            $or: [
                {'addresses.state': ModelState.ACTIVE},
                {'addresses.state': ModelState.NEW}
            ]
        }},
        { $group: {_id: resultProps, addresses: {$push: '$addresses'}}}
    ];
};

export class UserRepository {
    private model: Mongoose.Model<MongooseUserDocument>;
    private createUniqueId: () => string;

    private static ACTIVE_ADDRESS_FILTER = [
        { $unwind: '$addresses' },
        { $match: {
            $or: [
                {'addresses.state': ModelState.ACTIVE},
                {'addresses.state': ModelState.NEW}
            ]
        }},
        { $group: {_id: '$_id'}}
    ];

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
            .then((group: any) => group.length ? fromAddressDocument(group[0]._id) : null);
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

    public findByText(searchString: string, pagination: PaginationModel): Promise<UserModel[]> {
        const aggr1 = [
            {$match: {$text: {$search: searchString}}},
            {$skip: pagination.getPage() * pagination.getLimit()},
            {$limit: pagination.getLimit()},
            ...getActiveAddressesFilter()
        ];

        return <any> this.model.aggregate(...aggr1)
            .then(users => users.map((user: any) => {
                user._id.addresses = user.addresses;
                return fromUserDocument(user._id);
            }));
    }

    private findOneBy(fields: UserDocument): Promise<UserDocument> {
        const aggr1 = [
            { $match: fields},
            ...getActiveAddressesFilter()
        ];

        return <Promise<UserDocument>> this.model.aggregate(...aggr1)
            .then(users => users.length ? (<any> users[0])._id : null);

        // const aggr2 = [
        //     { $match: fields}
        // ];

        // return takeOne<UserDocument>(makeAggregation<UserDocument>(aggr1, aggr2)(this.model));
    }
}
