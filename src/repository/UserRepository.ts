import {RepositoryBase} from "./base/RepositoryBase";
import {UserDocument} from "../database/UserDocument";
import {UserSchema} from "../database/UserSchema";
import {UserModel} from "../database/UserModel";

export class UserRepository {
    private repoBase: RepositoryBase<UserDocument>;

    constructor (repoBase: RepositoryBase<UserDocument>) {
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

    public findByEmail(email: string, callback: (error: any, result: any) => void) {
        // this.repoBase.findByEmail(email, callback);
    }

    public findAll(callback: (error: any, result: any) => void) {
        // this.repoBase.findAll(callback);
    }

    private toUserDocument(userModel: UserModel): UserDocument {
        return <UserDocument> {
            name: userModel.getName(),
            age: userModel.getAge(),
            profession: userModel.getProfession(),
            email: userModel.getEmail(),
            id: userModel.getUuid()
        }
    }

    private toUserModel(userDocument: UserDocument): UserModel {
        return new UserModel(
            userDocument.name,
            userDocument.age,
            userDocument.profession,
            userDocument.email,
            userDocument.id
        )
    }
}
