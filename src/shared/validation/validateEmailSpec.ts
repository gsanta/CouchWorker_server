import { validateEmail } from './validateEmail';
import { LoginModel } from '../model/login/LoginModel';
import { LoginValidationModel } from '../model/login/LoginValidationModel';

describe('validateEmail', () => {
    describe('if email is valid', () => {
        it('should return an optional with no value', () => {
            const loginModel = new LoginModel().setEmail('abcd@efg.com');

            let validation = validateEmail<LoginValidationModel>(loginModel);
            expect(validation.isPresent()).toBeFalsy();
        });
    });

    describe('if email is not valid', () => {
        it('should return an optional with the correct ValidationError', () => {
            const loginModel = new LoginModel().setEmail('acde');

            let validation = validateEmail(loginModel);
            expect(validation.getValue().getMessage()).toBe('Not a valid email.');
        });
    });

    describe('if email is empty', () => {
        it('should return an optional with the correct ValidationError', () => {
            const loginModel = new LoginModel().setEmail('');

            let validation = validateEmail(loginModel);
            expect(validation.getValue().getMessage()).toBe('Email is required.');
        });
    });
});