import { validateRequired } from './validateRequired';

export function validatePassword(password: string): string {
    return validateRequired(password, 'Password is required.');
}