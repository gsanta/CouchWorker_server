import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { QueryMetaData } from '../../../repository/QueryMetaData';
import { UserModel } from '../../../../shared/model/user/UserModel';

export class UserRepository {
    private repoBase: RepositoryBase<MongooseUserDocument>;

    constructor (repoBase: RepositoryBase<MongooseUserDocument>) {
        this.repoBase = repoBase;
    }

    public create (user: UserModel): Promise<UserModel> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.create(userDocument)
            .then(userDocument => this.toUserModel(userDocument));
    }

    public update(user: UserModel): Promise<UserModel> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.update(userDocument)
            .then(userDocument => this.toUserModel(userDocument));
    }

    public delete(user: UserModel): Promise<UserModel> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.delete(userDocument)
            .then(() => user);
    }
    
    public findBy(user: UserModel, queryMetaData: QueryMetaData): Promise<UserModel[]> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.findBy(userDocument, queryMetaData)
            .then(docs => docs.map(doc => this.toUserModel(doc)));
    }

    public findAll(queryMetaData: QueryMetaData): Promise<UserModel[]> {
        return this.repoBase.findAll(queryMetaData)
            .then(docs => docs.map(doc => this.toUserModel(doc)));
    }

    public findByEmail(email: string): Promise<UserModel> {
        return this.repoBase.findByEmail(email)
            .then(userDocument => this.toUserModel(userDocument));
    }

    private toUserDocument(userModel: UserModel): MongooseUserDocument {
        return <MongooseUserDocument> {
            firstName: userModel.getFirstName(),
            lastName: userModel.getLastName(),
            email: userModel.getEmail(),            
            birthDate: userModel.getBirthDate(),            
            profession: userModel.getProfession(),
            id: userModel.getUuid(),
            country: userModel.getAddress().getCountry(),
            city: userModel.getAddress().getCity(),
            street: userModel.getAddress().getStreet(),
            house: userModel.getAddress().getHouse()
        }
    }

    private toUserModel(userDocument: MongooseUserDocument): UserModel {
        return new UserModel(userDocument);
    }
}
