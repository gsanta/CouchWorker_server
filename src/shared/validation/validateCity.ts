import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';

type setCityError<T> = {setCityError: (error: string) => T};
type getCity = {getCity: () => string};
type OptionalCityValidationError<T extends setCityError<T>> = Optional<CityValidationError<T>>;

export class CityValidationError<T extends setCityError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setCityError(this.errorMessage);
    }
}

export function validateCity<T extends setCityError<T>>(model: getCity): OptionalCityValidationError<T> {
    let validationError: CityValidationError<T> = null;
    if (!model.getCity() || model.getCity().length === 0) {
        validationError = new CityValidationError<T>('City is required.');
    }

    return new Optional<CityValidationError<T>>(validationError);
}