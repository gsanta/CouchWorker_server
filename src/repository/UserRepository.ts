import {UserDocument} from "../database/UserDocument";
import {UserSchema} from "../database/UserSchema";
import {UserModel} from "../database/UserModel";
import RepositoryBase = require("./base/RepositoryBase");

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
}
