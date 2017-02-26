import {UserValidator} from "./UserValidator";

describe('UserValidator', () => {
    describe('validateRegistration', () => {
        it ('should return with a UserModel if the data is valid', () => {
            const userValidator = new UserValidator();

            const data = {
                name: 'Santa Gergely',
                age: 26,
                profession: 'Software developer',
                email: 'santagergely90@gmail.com'
            }

            const user = userValidator.validateRegistration(data);

            expect(user.getName()).toBe(data.name);
            expect(user.getAge()).toBe(data.age);
            expect(user.getProfession()).toBe(data.profession);
            expect(user.getEmail()).toEqual(data.email);
        });

        it ('should throw an error if required fields are missing', () => {
            const userValidator = new UserValidator();

            const data = {
                name: 'Santa Gergely',
                age: 26,
                profession: 'Software developer'
            }

            expect(function() {userValidator.validateRegistration(data)})
                .toThrow(new Error('ValidationError: child "email" fails because ["email" is required]'));
        });

        it ('should throw an error if age is not a number', () => {
            const userValidator = new UserValidator();

            const data = {
                name: 'Santa Gergely',
                age: 'str',
                profession: 'Software developer',
                email: 'santagergely90@gmail.com'
            }

            expect(function() {userValidator.validateRegistration(data)})
                .toThrow(new Error('ValidationError: child "age" fails because ["age" must be a number]'));
        });
    });

    describe('validateEmail', () => {
        it('should return with the email if validation passes', () => {
            const userValidator = new UserValidator();

            const data = {
                email: 'santagergely90@gmail.com'
            }

            expect(userValidator.validateEmail(data)).toEqual('santagergely90@gmail.com');
        });

        it('should throw an error if the parameter is not a valid email', () => {
            const userValidator = new UserValidator();

            const data = {
                email: 'santagergely90'
            }

            expect(function() {userValidator.validateEmail(data)}).toThrow(new Error(
                'ValidationError: child "email" fails because ["email" must be a valid email]'
            ));
        });

        it('should throw an error if the email parameter is missing', () => {
            const userValidator = new UserValidator();

            expect(function() {userValidator.validateEmail({})}).toThrow(new Error(
                'ValidationError: child "email" fails because ["email" is required]'
            ));
        });
    });
});
