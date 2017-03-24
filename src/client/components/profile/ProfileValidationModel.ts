

export class ProfileValidationModel {
    private firstNameValidationError: string;
    private lastNameValidationError: string;

    public setFirstNameValidationError(errorMessage: string) {
        this.firstNameValidationError = errorMessage;
    }

    public getFirstNameValidationError(): string {
        return this.firstNameValidationError;
    }

    public setLastNameValidationError(errorMessage: string) {
        this.lastNameValidationError = errorMessage;
    }

    public getLastNameValidationError(): string {
        return this.lastNameValidationError;
    }
}