import * as validator from 'validator';
import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setEmailError = {setEmailErrorMessage: (error: string) => void};
type getEmail = {getEmail: () => string};
type OptionalEmailValidationError<T extends setEmailError> = Optional<EmailValidationError<T>>;

export class EmailValidationError<T extends setEmailError> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): void {
        errorHolder.setEmailErrorMessage(this.errorMessage);
    }
}

export function validateEmail<T extends setEmailError>(model: getEmail): OptionalEmailValidationError<T> {
    let validationError: EmailValidationError<setEmailError> = null;
    if (!model.getEmail() || model.getEmail().length === 0) {
        validationError = new EmailValidationError<setEmailError>('Email is required.');
    } else if (!validator.isEmail(model.getEmail())) {
        validationError = new EmailValidationError<setEmailError>('Not a valid email.');        
    }

    return new Optional<EmailValidationError<setEmailError>>(validationError);
}