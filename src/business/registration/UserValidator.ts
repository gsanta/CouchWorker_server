import {UserModel} from "../UserModel";
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

        return new UserModel({
            name: data.name,
            age: data.age,
            profession: data.profession,
            email: data.email,
            id: undefined,
            address: {
                country: data.country,
                city: data.city,
                street: data.street,
                house: data.house
            }
        });
    }

    public validateEmail(data: any): string {
        const result = joi.validate(data, userEmailSchema);

        if (result.error) {
            throw new Error(result.error.toString());
        }

        return data.email;
    }
}
