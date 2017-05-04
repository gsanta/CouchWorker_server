import { validateEmail } from './validateEmail';
import { LoginModel } from '../model/login/LoginModel';
import { LoginValidationModel } from '../model/login/LoginValidationModel';

describe('validateEmail', () => {
    describe('if email is valid', () => {
        it('should return undefined.', () => {
            let validation = validateEmail('abcd@efg.com');
            expect(validation).toBeFalsy();
        });
    });

    describe('if email is not valid', () => {
        it('should return the correct error message.', () => {
            let validation = validateEmail('acde');
            expect(validation).toBe('Not a valid email.');
        });
    });

    describe('if email is empty', () => {
        it('should return the correct error message.', () => {
            let validation = validateEmail('');
            expect(validation).toBe('Email is required.');
        });
    });
});