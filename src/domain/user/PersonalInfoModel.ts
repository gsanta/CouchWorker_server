


export class PersonalInfoModel {
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;

    constructor(firstName: string, lastName: string, birthDate: Date, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }

    public getFirstName() {
        return this.firstName;
    }

    public getLastName() {
        return this.lastName;
    }

    public getBirthDate() {
        return this.birthDate;
    }

    public getEmail(): string {
        return this.email;
    }
}