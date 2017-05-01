import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setCountryError<T> = {setCountryError: (error: string) => T};
type getCountry = {getCountry: () => string};
type OptionalCountryValidationError<T extends setCountryError<T>> = Optional<CountryValidationError<T>>;

export class CountryValidationError<T extends setCountryError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setCountryError(this.errorMessage);
    }
}

export function validateCountry<T extends setCountryError<T>>(model: getCountry): OptionalCountryValidationError<T> {
    let validationError: CountryValidationError<T> = null;
    if (!model.getCountry() || model.getCountry().length === 0) {
        validationError = new CountryValidationError<T>('Country is required.');
    }

    return new Optional<CountryValidationError<T>>(validationError);
}