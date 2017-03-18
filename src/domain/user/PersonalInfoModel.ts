


export class PersonalInfoModel {
    private firstName: string;
    private lastName: string;
    private birthDate: Date;

    constructor(firstName: string, lastName: string, birthDate: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
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
}