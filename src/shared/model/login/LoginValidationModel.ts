

export class LoginValidationModel {
    private emailError: string;
    private passwordError: string;

    public setEmailError(error: string): LoginValidationModel {
        const copy = this.copy();
        copy.emailError = error;
        return copy;
    }

    public getEmailError(): string {
        return this.emailError;
    }

    public setPasswordError(error: string): LoginValidationModel {
        const copy = this.copy();
        copy.passwordError = error;
        return copy;
    }

    public getPasswordError(): string {
        return this.passwordError;
    }

    public hasError(): boolean {
        return !!(
            this.getEmailError() ||
            this.getPasswordError()
        )
    }

    private copy(): LoginValidationModel {
        const copy = new LoginValidationModel();
        copy.emailError = this.emailError;
        copy.passwordError = this.passwordError;
        return copy;
    }
}