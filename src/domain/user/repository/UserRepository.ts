import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { UserModel } from '../UserModel';

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

    public findByEmail(email: string): Promise<UserModel> {
        return this.repoBase.findByEmail(email)
            .then(userDocument => this.toUserModel(userDocument));
    }

    public findAll(): Promise<UserModel[]> {
        return this.repoBase.findAll()
            .then(docs => docs.map(doc => this.toUserModel(doc)));
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
