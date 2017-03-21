


export class PersonalInfoModel {
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;

    constructor(firstName?: string, lastName?: string, birthDate?: Date, email?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }

    public getFirstName() {
        return this.firstName;
    }

    public setFirstName(firstName: string): PersonalInfoModel {
        let copy = this.copy();
        copy.firstName = firstName;
        return copy;
    }

    public getLastName() {
        return this.lastName;
    }

    public setLastName(lastName: string): PersonalInfoModel {
        let copy = this.copy();
        copy.lastName = lastName;
        return copy;
    }

    public getBirthDate() {
        return this.birthDate;
    }

    public setBirthDate(birthDate: Date): PersonalInfoModel {
        let copy = this.copy();
        copy.birthDate = birthDate;
        return copy;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): PersonalInfoModel {
        let copy = this.copy();
        copy.email = email;
        return copy;
    }

    private copy(): PersonalInfoModel {
        let copy = new PersonalInfoModel();

        copy.firstName = this.firstName;
        copy.lastName = this.lastName;
        copy.birthDate = this.birthDate;
        copy.email = this.email;

        return copy;
    }
}