

export class LoginValidationModel {
    private emailError: string;
    private passwordError: string;

    public setEmailErrorMessage(error: string): LoginValidationModel {
        const copy = this.copy();
        copy.emailError = error;
        return copy;
    }

    public getEmailErrorMessage(): string {
        return this.emailError;
    }

    public setPasswordErrorMessage(error: string): LoginValidationModel {
        const copy = this.copy();
        copy.passwordError = error;
        return copy;
    }

    public getPasswordErrorMessage(): string {
        return this.passwordError;
    }

    public hasError(): boolean {
        return !!(
            this.getEmailErrorMessage() ||
            this.getPasswordErrorMessage()
        )
    }

    private copy(): LoginValidationModel {
        const copy = new LoginValidationModel();
        copy.emailError = this.emailError;
        copy.passwordError = this.passwordError;
        return copy;
    }
}