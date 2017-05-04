import { validateRequired } from './validateRequired';

export function validateLastName(lastName: string): string {
    return validateRequired(lastName, 'Last name is required.');
}