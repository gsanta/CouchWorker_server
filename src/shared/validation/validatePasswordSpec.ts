import { validatePassword } from './validatePassword';
import { LoginModel } from '../model/login/LoginModel';

describe('validatePassword', () => {
    describe('if password is valid', () => {
        it('should return an optional with no value', () => {
            const loginModel = new LoginModel().setPassword('abcd');

            let validation = validatePassword(loginModel);
            expect(validation.isPresent()).toBeFalsy();
        });
    });

    describe('if password is not valid', () => {
        it('should return an optional with ValidationError', () => {
            const loginModel = new LoginModel().setPassword('');

            let validation = validatePassword(loginModel);
            expect(validation.getValue().getMessage()).toBe('Password is required.');
        });
    });
});