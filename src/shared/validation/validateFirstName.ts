import { Optional } from '../Optional';
import { ValidationError } from './ValidationError';
import { validateRequired } from './validateRequired';

export function validateFirstName(firstName: string): string {
    return validateRequired(firstName, 'First name is required.');
}