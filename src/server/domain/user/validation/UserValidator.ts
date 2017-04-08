import * as joi from 'joi';
import { UserModel } from '../../../../shared/model/user/UserModel';

const alphaNumSpaceDashUscore = /^[a-z\d\-_\s]+$/i;
const userRegistrationSchema = joi.object().keys({
    firstName: joi.string().regex(alphaNumSpaceDashUscore).min(3).max(30).required(),
    lastName: joi.string().regex(alphaNumSpaceDashUscore).min(3).max(30).required(),
    email: joi.string().email().required(),
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
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: new Date(Date.now()),
            email: data.email,
            profession: data.profession,
            country: data.country,
            city: data.city,
            street: data.street,
            house: data.house
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
