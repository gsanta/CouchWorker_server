import * as validator from 'validator';
import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setEmailError<T> = {setEmailErrorMessage: (error: string) => T};
type getEmail = {getEmail: () => string};
type OptionalEmailValidationError<T extends setEmailError<T>> = Optional<EmailValidationError<T>>;

export class EmailValidationError<T extends setEmailError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setEmailErrorMessage(this.errorMessage);
    }
}

export function validateEmail<T extends setEmailError<T>>(model: getEmail): OptionalEmailValidationError<T> {
    let validationError: EmailValidationError<T> = null;
    if (!model.getEmail() || model.getEmail().length === 0) {
        validationError = new EmailValidationError<T>('Email is required.');
    } else if (!validator.isEmail(model.getEmail())) {
        validationError = new EmailValidationError<T>('Not a valid email.');        
    }

    return new Optional<EmailValidationError<T>>(validationError);
}