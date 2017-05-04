import { validateRequired } from './validateRequired';

export function validateCountry(country: string): string {
    return validateRequired(country, 'Country is required.');
}