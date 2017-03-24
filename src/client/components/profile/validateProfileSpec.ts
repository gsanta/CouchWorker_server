import { UserModel } from '../../../domain/user/UserModel';
import { validateFirstName, validateLastName } from './validateProfile';

describe('validateProfile', () => {
    describe('validateFirstName', () => {
        describe('if firstName is valid', () => {
            it('should return an optional with no value', () => {
                const userModel = new UserModel().setFirstName('abcd');

                let validation = validateFirstName(userModel);
                expect(validation.isPresent()).toBeFalsy();
            });
        });

        describe('if firstName is not valid', () => {
            it('should return an optional with ValidationError', () => {
                const userModel = new UserModel().setFirstName('');

                let validation = validateFirstName(userModel);
                expect(validation.getValue().getMessage()).toBe('First name is required.');
            });
        });
    });
    
    describe('validateLastName', () => {
        describe('if lastName is valid', () => {
            it('should return an optional with no value', () => {
                const userModel = new UserModel().setLastName('abcd');

                let validation = validateLastName(userModel);
                expect(validation.isPresent()).toBeFalsy();
            });
        });

        describe('if lastName is not valid', () => {
            it('should return an optional with ValidationError', () => {
                const userModel = new UserModel().setLastName('');

                let validation = validateLastName(userModel);
                expect(validation.getValue().getMessage()).toBe('Last name is required.');
            });
        });
    });
});