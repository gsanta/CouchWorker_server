import { validateRequired } from './validateRequired';

export function validateCity(city: string): string {
    return validateRequired(city, 'City is required.');
}