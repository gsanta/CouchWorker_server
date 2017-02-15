import {UserModel} from "../../database/UserModel";
import * as joi from 'joi';


const alphaNumSpaceDashUscore = /^[a-z\d\-_\s]+$/i;
const userSchema = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    age: joi.number().integer().min(1).max(200),
    profession: joi.string().alphanum().min(3).max(30).required()
});

export class UserJSONParser {
    private userModel: UserModel;

    constructor(data: any) {
        this.userModel = this.parse(data);
    }

    public getUser(): UserModel {
        return this.userModel;
    }

    private parse(data: any): UserModel {
        const result = joi.validate(data, userSchema);
        console.log(result.error);

        if (result.error) {
            throw new Error('Not valid');
        }

        const {
            name,
            age,
            profession
        } = data;
        return new UserModel(name, age, profession);
    }
}
