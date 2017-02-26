import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { UserModel } from '../UserModel';
import { QueryMetaData } from '../../../repository/QueryMetaData';

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
            name: userModel.getName(),
            age: userModel.getAge(),
            profession: userModel.getProfession(),
            email: userModel.getEmail(),
            id: userModel.getUuid(),
            address: {
                country: userModel.getAddress().getCountry(),
                city: userModel.getAddress().getCity(),
                street: userModel.getAddress().getStreet(),
                house: userModel.getAddress().getHouse()
            }
        }
    }

    private toUserModel(userDocument: MongooseUserDocument): UserModel {
        return new UserModel(userDocument);
    }
}
