import { Optional } from './Optional';
import { ValidationError } from './ValidationError';

type setPasswordError = {setPasswordErrorMessage: (error: string) => void};
type getPassword = {getPassword: () => string};
type OptionalPasswordValidationError<T extends setPasswordError> = Optional<PasswordValidationError<T>>;

export class PasswordValidationError<T extends setPasswordError> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): void {
        errorHolder.setPasswordErrorMessage(this.errorMessage);
    }
}

export function validatePassword<T extends setPasswordError>(model: getPassword): OptionalPasswordValidationError<T> {
    let validationError: PasswordValidationError<setPasswordError> = null;
    if (model.getPassword().length === 0) {
        validationError = new PasswordValidationError<setPasswordError>('Password is required.');
    }

    return new Optional<PasswordValidationError<setPasswordError>>(validationError);
}