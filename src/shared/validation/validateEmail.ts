import * as validator from 'validator';
import { validateRequired } from './validateRequired';

export function validateEmail(email: string): string {
    let message = validateRequired(email, 'Email is required');
    if (!message && !validator.isEmail(email)) {
        message = 'Not a valid email.';
    }

    return message;
}