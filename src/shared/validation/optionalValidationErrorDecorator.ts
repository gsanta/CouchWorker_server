import { Optional } from '../Optional';
import { ValidationError, ValidationErrorConstructor } from './ValidationError';

export interface OptionalValidationError<T> {
    (errorMessage: string): Optional<ValidationError<T>>;
}

export function optionalValidationErrorDecorator<T>(
        validationErrorConstructor: ValidationErrorConstructor<T>
    ): OptionalValidationError<T> {
        return (errorMessage: string) => {
            return new Optional<ValidationError<T>>(
                new validationErrorConstructor(errorMessage)
            );
        }
}