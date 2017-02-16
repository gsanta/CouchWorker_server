import {RepositoryBase} from "./base/RepositoryBase";
import {UserDocument} from "../database/UserDocument";
import {UserSchema} from "../database/UserSchema";
import {UserModel} from "../database/UserModel";

export class UserRepository {
    private repoBase: RepositoryBase<UserDocument>;

    constructor (repoBase: RepositoryBase<UserDocument>) {
        this.repoBase = repoBase;
    }

    public create (user: UserModel, callback: (error: any, result: any) => void) {
        const userDocument = this.toUserDocument(user);
        this.repoBase.create(userDocument, callback);
    }

    public update(user: UserModel, callback:(error: any, result: any) => void) {
        const userDocument = this.toUserDocument(user);
        this.repoBase.update(userDocument, (err: any) => callback(err, null));
    }

    public delete(user: UserModel, callback:(error: any, result: any) => void) {
        const userDocument = this.toUserDocument(user);
        this.repoBase.delete(userDocument, (err: any) => callback(err, null));
    }

    public findByEmail(email: string, callback: (error: any, result: any) => void) {
        this.repoBase.findByEmail(email, callback);
    }

    public findAll(callback: (error: any, result: any) => void) {
        this.repoBase.findAll(callback);
    }

    private toUserDocument(userModel: UserModel): UserDocument {
        return <UserDocument> {
            name: userModel.getName(),
            id: userModel.getUuid(),
            age: userModel.getAge(),
            profession: userModel.getProfession()
        }
    }
}
