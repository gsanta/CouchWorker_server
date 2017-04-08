import { ValidationError } from './ValidationError';
import { Optional } from '../Optional';

export interface ValidatorFunc<T, U> {
    (model: T):  Optional<ValidationError<U>>
}