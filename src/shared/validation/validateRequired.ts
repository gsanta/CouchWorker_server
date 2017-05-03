

export function validateRequired(field: string, message: string): string {
    if (!field || field.length === 0) {
        return message;
    }

    return null;
}