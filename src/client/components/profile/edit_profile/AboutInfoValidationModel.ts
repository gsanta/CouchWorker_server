

export class AboutInfoValidationModel {
    private firstNameError: string;
    private lastNameError: string;
    private birthDateError: string;
    private emailError: string;
    private professionError: string;

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

    public hasError(): boolean {
        return !!(
            this.firstNameError ||
            this.lastNameError ||
            this.birthDateError ||
            this.emailError ||
            this.professionError
        );
    }

    private copy(): AboutInfoValidationModel {
        const copy = new AboutInfoValidationModel();
        copy.firstNameError = this.firstNameError;
        copy.lastNameError = this.lastNameError;
        copy.birthDateError = this.birthDateError;
        copy.emailError = this.emailError;
        copy.professionError = this.professionError;

        return copy;
    }
}