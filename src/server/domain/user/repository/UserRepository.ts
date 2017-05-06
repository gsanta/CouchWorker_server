import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { PaginationModel } from '../../../repository/PaginationModel';
import { UserModel, toUserDocument, fromUserDocument } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { RatingModel } from '../../../../shared/model/RatingModel';

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
            .then(userDocument => fromUserDocument(userDocument));
    }

    public update(user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.repoBase.update(userDocument)
            .then(userDocument => fromUserDocument(userDocument));
    }

    public delete(user: UserModel): Promise<UserModel> {
        const userDocument = toUserDocument(user);
        return this.repoBase.delete(userDocument)
            .then(() => user);
    }
    
    public findBy(user: UserModel, pagination: PaginationModel): Promise<UserModel[]> {
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
        const uniqueIndex = userNameParts.length === 3 ? userNameParts[2] : 0;
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
