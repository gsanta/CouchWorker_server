import { ValidationError } from './ValidationError';
import { Optional } from '../Optional';

export interface ValidatorFunc {
    (val: string):  string;
}