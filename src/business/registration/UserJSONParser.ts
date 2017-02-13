import {UserModel} from "../../database/UserModel";

export class UserJSONParser {
    private userModel: UserModel;

    constructor(data: any) {
        this.userModel = this.parse(data);
    }

    public getUser(): UserModel {
        return this.userModel;
    }

    private parse(data: any): UserModel {
        if (!data.user) {
            throw new Error('UserName is mandatory');
        }

        return new UserModel(null, null, null);
    }
}
