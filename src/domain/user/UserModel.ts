import { UserDocument } from './UserDocument';
import { AddressModel } from './AddressModel';
import { PersonalInfoModel } from './PersonalInfoModel';

export class UserModel {
    private uuid: string;
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;
    private profession: string;
    private address: AddressModel;

    constructor(userDocument?: UserDocument) {
        if (userDocument) {
            this.profession = userDocument.profession;
            this.uuid = userDocument.id;
            this.firstName = userDocument.firstName,
            this.lastName = userDocument.lastName,
            this.birthDate = userDocument.birthDate,
            this.email = userDocument.email                        
            this.address = new AddressModel({
                country: userDocument.country,
                city: userDocument.city,
                street: userDocument.street,
                house: userDocument.house
            });
        } else {
            this.address = new AddressModel()
        }
    }

    public getProfession(): string {
        return this.profession;
    }

    public setProfession(profession: string): UserModel {
        let clone = this.copy();
        clone.profession = profession;

        return clone;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): UserModel {
        let clone = this.copy();
        clone.uuid = uuid;

        return clone;
    }

    public getFirstName() {
        return this.firstName;
    }

    public setFirstName(firstName: string): UserModel {
        let copy = this.copy();
        copy.firstName = firstName;
        return copy;
    }

    public getLastName() {
        return this.lastName;
    }

    public setLastName(lastName: string): UserModel {
        let copy = this.copy();
        copy.lastName = lastName;
        return copy;
    }

    public getBirthDate() {
        return this.birthDate;
    }

    public setBirthDate(birthDate: Date): UserModel {
        let copy = this.copy();
        copy.birthDate = birthDate;
        return copy;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): UserModel {
        let copy = this.copy();
        copy.email = email;
        return copy;
    }

    public getAddress(): AddressModel {
        return this.address;
    }

    public setAddress(address: AddressModel): UserModel {
        let clone = this.copy();
        clone.address = address;

        return clone;
    }

    private copy(): UserModel {
        let copy = new UserModel(null);
        copy.profession = this.profession;
        copy.uuid = this.uuid;
        copy.firstName = this.firstName;
        copy.lastName = this.lastName;
        copy.birthDate = this.birthDate;
        copy.email = this.email;
        copy.address = this.address;

        return copy;
    }
}