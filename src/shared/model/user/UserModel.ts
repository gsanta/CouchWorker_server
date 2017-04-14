import { UserDocument } from './UserDocument';
import { AddressModel } from '../AddressModel';

export interface UserModelParams {
    firstName: string;
    lastName: string;
    userName: string;
    birthDate: Date;
    email: string;
    profession: string;
    addresses: AddressModel[];
}

export function jsonToUserModelParams(json: any): UserModel {
    const userParams = {
        firstName: json.firstName,
        lastName: json.lastName,
        email: json.email,       
        userName: json.userName,     
        birthDate: json.birthDate,            
        profession: json.profession,
        addresses: json.addresses.map(address => this.toAddressModel(address)),
        id: json.id
    }

    return new UserModel(userParams);
}

export class UserModel {
    private uuid: string;
    private firstName: string;
    private lastName: string;
    private userName: string;
    private birthDate: Date;
    private email: string;
    private profession: string;
    private addresses: AddressModel[];

    constructor(params?: UserModelParams, id?: string) {
        if (params) {
            this.profession = params.profession;
            this.firstName = params.firstName,
            this.lastName = params.lastName,
            this.userName = params.userName,
            this.birthDate = params.birthDate,
            this.email = params.email                        
            this.addresses = params.addresses
            this.uuid = id;
        } else {
            this.addresses = []
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

    public getUserName(): string {
        return this.userName;    
    }

    public setUserName(userName: string) {
        let copy = this.copy();
        copy.userName = userName;
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

    public getAddresses(): AddressModel[] {
        return this.addresses;
    }

    public setAddresses(addresses: AddressModel[]): UserModel {
        let clone = this.copy();
        clone.addresses = addresses;

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
        copy.addresses = this.addresses;

        return copy;
    }
}