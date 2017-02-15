import {RepositoryBase} from "./base/RepositoryBase";
import {UserDocument} from "../database/UserDocument";
import {UserSchema} from "../database/UserSchema";
import {UserModel} from "../database/UserModel";

export class UserRepository {
    private repoBase: RepositoryBase<UserDocument>;

    constructor (repoBase: RepositoryBase<UserDocument>) {
        this.repoBase = repoBase;
    }

    public create (item: UserModel, callback: (error: any, result: any) => void) {
        let document: UserDocument = <UserDocument> {
            name: item.getName(),
            age: item.getAge(),
            profession: item.getProfession()
        };

        this.repoBase.create(document, callback);
    }

    public findByEmail(email: string, callback: (error: any, result: any) => void) {
        this.repoBase.findByEmail(email, callback);
    }

    public findAll(callback: (error: any, result: any) => void) {
        this.repoBase.findAll(callback);
    }

    public delete(_id: string, callback:(error: any, result: any) => void) {
        this.repoBase.delete(_id, (err) => callback(err, null));

    }
}
