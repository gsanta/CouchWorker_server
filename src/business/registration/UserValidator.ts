import {UserModel} from "../../database/UserModel";
import {UserRegistrationModel} from "../user/rest/UserRegistrationModel";
import * as joi from 'joi';

const alphaNumSpaceDashUscore = /^[a-z\d\-_\s]+$/i;
const userRegistrationSchema = joi.object().keys({
    name: joi.string().regex(alphaNumSpaceDashUscore).min(3).max(30).required(),
    email: joi.string().email().required(),
    age: joi.number().integer().min(1).max(200).required(),
    profession: joi.string().regex(alphaNumSpaceDashUscore).min(3).max(30).required()
});

const userEmailSchema = joi.object().keys({
    email: joi.string().email().required()
});


export class UserValidator {
    public validateRegistration(data: any): UserModel {
        const result = joi.validate(data, userRegistrationSchema);

        if (result.error) {
            throw new Error(result.error.toString());
        }

        return new UserModel(
            data.name,
            data.age,
            data.profession,
            data.email
        );
    }

    public validateEmail(data: any): string {
        const result = joi.validate(data, userEmailSchema);

        if (result.error) {
            throw new Error(result.error.toString());
        }

        return data.email;
    }
}
