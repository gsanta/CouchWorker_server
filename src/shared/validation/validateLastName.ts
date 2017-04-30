import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setLastNameError<T> = {setLastNameError: (error: string) => T};
type getLastName = {getLastName: () => string};
type OptionalLastNameValidationError<T extends setLastNameError<T>> = Optional<LastNameValidationError<T>>;

export class LastNameValidationError<T extends setLastNameError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setLastNameError(this.errorMessage);
    }
}

export function validateLastName<T extends setLastNameError<T>>(model: getLastName): OptionalLastNameValidationError<T> {
    let validationError: LastNameValidationError<T> = null;
    if (!model.getLastName() || model.getLastName().length === 0) {
        validationError = new LastNameValidationError<T>('Last name is required.');
    }

    return new Optional<LastNameValidationError<T>>(validationError);
}