

export class AboutInfoValidationModel {
    private firstNameError: string;
    private lastNameError: string;
    private birthDateError: string;
    private emailError: string;
    private professionError: string;
    private countryError: string;
    private cityError: string;

    public setFirstNameError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();
        copy.firstNameError = errorMessage; 
        return copy;
    }

    public getFirstNameError(): string {
        return this.firstNameError;
    }

    public setLastNameError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();        
        copy.lastNameError = errorMessage;
        return copy;
    }

    public getLastNameError(): string {
        return this.lastNameError;
    }

    public setBirthDateError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();                
        copy.birthDateError = errorMessage;
        return copy;
    }

    public getBirthDateError(): string {
        return this.birthDateError;
    }

    public setEmailError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();                        
        copy.emailError = errorMessage;
        return copy;
    }

    public getEmailError(): string {
        return this.emailError;
    }
    
    public setProfessionError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();                                                
        copy.professionError = errorMessage;
        return copy;
    }

    public getProfessionError(): string {
        return this.professionError;
    }

    public setCountryError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();                                                
        copy.countryError = errorMessage;
        return copy;
    }

    public getCountryError(): string {
        return this.countryError;
    }

    public setCityError(errorMessage: string): AboutInfoValidationModel {
        const copy = this.copy();                                                
        copy.cityError = errorMessage;
        return copy;
    }

    public getCityError(): string {
        return this.cityError;
    }

    public hasError(): boolean {
        return !!(
            this.firstNameError ||
            this.lastNameError ||
            this.birthDateError ||
            this.emailError ||
            this.professionError ||
            this.countryError ||
            this.cityError
        );
    }

    private copy(): AboutInfoValidationModel {
        const copy = new AboutInfoValidationModel();
        copy.firstNameError = this.firstNameError;
        copy.lastNameError = this.lastNameError;
        copy.birthDateError = this.birthDateError;
        copy.emailError = this.emailError;
        copy.professionError = this.professionError;
        copy.countryError = this.countryError;
        copy.cityError = this.cityError;

        return copy;
    }
}