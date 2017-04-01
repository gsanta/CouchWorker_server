

export class ProfileValidationModel {
    private firstNameValidationError: string;
    private lastNameValidationError: string;
    private birthDateValidationError: string;
    private emailErrorMessage: string;
    private countryValidationError: string;
    private cityValidationError: string;
    private professionValidationError: string;

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

    public setBirthDateValidationError(errorMessage: string) {
        this.birthDateValidationError = errorMessage;
    }

    public getBirthDateValidationError(): string {
        return this.birthDateValidationError;
    }

    public setEmailErrorMessage(errorMessage: string) {
        this.emailErrorMessage = errorMessage;
    }

    public getEmailErrorMessage(): string {
        return this.emailErrorMessage;
    }

    public setCountryValidationError(errorMessage: string) {
        this.countryValidationError = errorMessage;
    }

    public getCountryValidationError(): string {
        return this.countryValidationError;
    }

    public setCityValidationError(errorMessage: string) {
        this.cityValidationError = errorMessage;
    }

    public getCityValidationError(): string {
        return this.cityValidationError;
    }

    public setProfessionValidationError(errorMessage: string) {
        this.professionValidationError = errorMessage;
    }

    public getProfessionValidationError(): string {
        return this.professionValidationError;
    }

    public hasError(): boolean {
        return !!(
            this.firstNameValidationError ||
            this.lastNameValidationError ||
            this.birthDateValidationError ||
            this.emailErrorMessage ||
            this.countryValidationError ||
            this.cityValidationError ||
            this.professionValidationError
        );
    }
}