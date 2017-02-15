import {UserRegistrationModel} from "../user/rest/UserRegistrationModel";
import * as joi from 'joi';

const alphaNumSpaceDashUscore = /^[a-z\d\-_\s]+$/i;
const userRegistrationSchema = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email(),
    age: joi.number().integer().min(1).max(200),
    profession: joi.string().alphanum().min(3).max(30).required()
});

const userEmailSchema = joi.object().keys({
    email: joi.string().email()
});


export class UserValidator {

    public validateRegistration(data: any): UserRegistrationModel {
        const result = joi.validate(data, userRegistrationSchema);
        console.log(result.error);

        if (result.error) {
            throw new Error('Not valid');
        }

        return {
            name: data.name,
            age: data.age,
            email: data.email,
            profession: data.prfession
        };
    }

    public validateEmail(data: any): string {
        const result = joi.validate(data, userEmailSchema);

        if (result.error) {
            throw new Error('Not valid');
        }

        return data.email;
    }
}
