import { validatePassword } from './validatePassword';
import { LoginModel } from '../model/login/LoginModel';

describe('validatePassword', () => {
    describe('if password is valid', () => {
        it('should return an optional with no value', () => {
            let validation = validatePassword('abcd');
            expect(validation).toBeFalsy();
        });
    });

    describe('if password is not valid', () => {
        it('should return an optional with ValidationError', () => {
            let validation = validatePassword('');
            expect(validation).toBe('Password is required.');
        });
    });
});