

export class LoginValidationModel {
    private emailError: string;
    private passwordError: string;

    public setEmailErrorMessage(error: string) {
        this.emailError = error;
    }

    public getEmailErrorMessage(): string {
        return this.emailError;
    }

    public setPasswordErrorMessage(error: string) {
        this.passwordError = error;
    }

    public getPasswordErrorMessage(): string {
        return this.passwordError;
    }
}