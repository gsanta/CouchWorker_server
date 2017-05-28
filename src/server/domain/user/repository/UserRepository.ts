import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { PaginationModel } from '../../../repository/PaginationModel';
import { UserModel, toUserDocument, fromUserDocument, splitUserName } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument, toAddressDocument, fromAddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { RatingModel } from '../../../../shared/model/RatingModel';
import { ModelState } from '../../../../shared/model/ModelState';

export class UserRepository {
    private repoBase: RepositoryBase<UserDocument>;
    private createUniqueId: () => string;

    constructor (repoBase: RepositoryBase<UserDocument>, createUniqueId: () => string) {
        this.repoBase = repoBase;
        this.createUniqueId = createUniqueId;
    }

    public create (user: UserModel): Promise<UserModel> {
        user = {...user, uuid: this.createUniqueId()};
        const userDocument = toUserDocument(user);
        return this.repoBase.create(userDocument)
            .then(document => fromUserDocument(document));
    }

    public update(user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.repoBase.update(userDocument)
            .then(document => fromUserDocument(document));
    }

    public delete(user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.repoBase.delete(userDocument)
            .then(() => user);
    }

    public findAddressByUuid(userName: string, uuid: string): Promise<AddressModel> {
        return this.repoBase.aggregate(
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

        return this.repoBase.set(
            query,
            { 'addresses.$': toAddressDocument(address) }
        );
    }

    public findByQuery(query: any, pagination?: PaginationModel): Promise<UserModel[]> {
        return this.repoBase.findByQuery(query, pagination)
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }

    public findByUser(user: UserModel, pagination: PaginationModel): Promise<UserModel[]> {
        const userDocument = toUserDocument(user);
        return this.repoBase.findBy(userDocument, pagination)
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }

    public findAll(pagination: PaginationModel): Promise<UserModel[]> {
        return this.repoBase.findAll(pagination)
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }

    public findByEmail(email: string): Promise<UserModel> {
        const userDocument = <UserDocument> {
            email: email
        };

        return this.repoBase.findOneBy(userDocument)
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

        return this.repoBase.findOneBy(userDocument)
            .then(userDocument => fromUserDocument(userDocument));
    }

    public findByText(searchString: string, pagination: PaginationModel): Promise<UserModel[]> {
        return this.repoBase.findByText(searchString, pagination)
            .then(docs => docs.map(doc => fromUserDocument(doc)));
    }
}
