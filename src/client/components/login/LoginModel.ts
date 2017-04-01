

export class LoginModel {
    private email: string;
    private password: string;

    constructor(email: string = '', password: string = '') {
        this.email = email;
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        return new LoginModel(email, this.password);
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        return new LoginModel(this.email, password);
    }
}