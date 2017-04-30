import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setFirstNameError<T> = {setFirstNameError: (error: string) => T};
type getFirstName = {getFirstName: () => string};
type OptionalFirstNameValidationError<T extends setFirstNameError<T>> = Optional<FirstNameValidationError<T>>;

export class FirstNameValidationError<T extends setFirstNameError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setFirstNameError(this.errorMessage);
    }
}

export function validateFirstName<T extends setFirstNameError<T>>(model: getFirstName): OptionalFirstNameValidationError<T> {
    let validationError: FirstNameValidationError<T> = null;
    if (!model.getFirstName() || model.getFirstName().length === 0) {
        validationError = new FirstNameValidationError<T>('First name is required.');
    }

    return new Optional<FirstNameValidationError<T>>(validationError);
}