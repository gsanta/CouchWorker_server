import { Optional } from './Optional';
import { ValidationError } from './ValidationError';

export interface ValidatorFunc<T, U> {
    (model: T):  Optional<ValidationError<U>>
}