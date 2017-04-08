import { ValidationError } from './ValidationError';
import { Optional } from '../Optional';

type setPasswordError<T> = {setPasswordErrorMessage: (error: string) => T};
type getPassword = {getPassword: () => string};
type OptionalPasswordValidationError<T extends setPasswordError<T>> = Optional<PasswordValidationError<T>>;

export class PasswordValidationError<T extends setPasswordError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setPasswordErrorMessage(this.errorMessage);
    }
}

export function validatePassword<T extends setPasswordError<T>>(model: getPassword): OptionalPasswordValidationError<T> {
    let validationError: PasswordValidationError<T> = null;
    if (!model.getPassword() || model.getPassword().length === 0) {
        validationError = new PasswordValidationError<T>('Password is required.');
    }

    return new Optional<PasswordValidationError<T>>(validationError);
}