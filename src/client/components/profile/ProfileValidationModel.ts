

export class ProfileValidationModel {
    private firstNameValidationError: string;
    private lastNameValidationError: string;
    private birthDateValidationError: string;
    private emailErrorMessage: string;
    private countryValidationError: string;
    private cityValidationError: string;
    private professionValidationError: string;

    public setFirstNameValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();
        copy.firstNameValidationError = errorMessage; 
        return copy;
    }

    public getFirstNameValidationError(): string {
        return this.firstNameValidationError;
    }

    public setLastNameValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();        
        copy.lastNameValidationError = errorMessage;
        return copy;
    }

    public getLastNameValidationError(): string {
        return this.lastNameValidationError;
    }

    public setBirthDateValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();                
        copy.birthDateValidationError = errorMessage;
        return copy;
    }

    public getBirthDateValidationError(): string {
        return this.birthDateValidationError;
    }

    public setEmailErrorMessage(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();                        
        copy.emailErrorMessage = errorMessage;
        return copy;
    }

    public getEmailErrorMessage(): string {
        return this.emailErrorMessage;
    }

    public setCountryValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();                                
        copy.countryValidationError = errorMessage;
        return copy;
    }

    public getCountryValidationError(): string {
        return this.countryValidationError;
    }

    public setCityValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();                                        
        copy.cityValidationError = errorMessage;
        return copy;
    }

    public getCityValidationError(): string {
        return this.cityValidationError;
    }

    public setProfessionValidationError(errorMessage: string): ProfileValidationModel {
        const copy = this.copy();                                                
        copy.professionValidationError = errorMessage;
        return copy;
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

    private copy(): ProfileValidationModel {
        const copy = new ProfileValidationModel();
        copy.firstNameValidationError = this.firstNameValidationError;
        copy.lastNameValidationError = this.lastNameValidationError;
        copy.birthDateValidationError = this.birthDateValidationError;
        copy.emailErrorMessage = this.emailErrorMessage;
        copy.countryValidationError = this.countryValidationError;
        copy.cityValidationError = this.cityValidationError;
        copy.professionValidationError = this.professionValidationError;

        return this;
    }
}