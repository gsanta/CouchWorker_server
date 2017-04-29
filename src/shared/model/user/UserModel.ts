import { UserDocument } from './UserDocument';
import { AddressModel } from '../AddressModel';
import { List } from 'immutable';
import { RatingModel } from '../RatingModel';

export interface UserModelParams {
    firstName: string;
    lastName: string;
    userName: string;
    birthDate: Date;
    registrationDate: Date;
    email: string;
    profession: string;
    country: string;
    city: string;
    languages: string[];
    addresses: AddressModel[];
    rating: RatingModel;
    uuid: string;
    isActive: boolean;
}

export class UserModel {
    private uuid: string;
    private firstName: string;
    private lastName: string;
    private userName: string;
    private birthDate: Date;
    private registrationDate: Date;
    private email: string;
    private profession: string;
    private country: string;
    private city: string;
    private languages: List<string>;
    private addresses: List<AddressModel>;
    private rating: RatingModel;
    private isActive: boolean;

    constructor(params?: UserModelParams) {
        if (params) {
            this.profession = params.profession;
            this.firstName = params.firstName;
            this.lastName = params.lastName;
            this.userName = params.userName;
            this.birthDate = params.birthDate;
            this.registrationDate = params.registrationDate;
            this.email = params.email;
            this.country = params.country;                        
            this.city = params.city;
            this.languages = params.languages ? List<string>(params.languages) : List<string>();
            this.addresses = params.addresses ? List<AddressModel>(params.addresses) : List<AddressModel>();
            this.rating = params.rating;
            this.uuid = params.uuid;
            this.isActive = params.isActive;
        } else {
            this.addresses = List<AddressModel>();
            this.languages = List<string>();
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

    public getRegistrationDate() {
        return this.registrationDate;
    }

    public setRegistrationDate(registrationDate: Date): UserModel {
        let copy = this.copy();
        copy.registrationDate = registrationDate;
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

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): UserModel {
        let copy = this.copy();
        copy.country = country;
        return copy;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): UserModel {
        let copy = this.copy();
        copy.city = city;
        return copy;
    }
    
    public getLanguages(): List<string> {
        return this.languages;
    }

    public addLanguage(language: string): UserModel {
        const copy = this.copy();
        copy.languages = copy.languages.push(language);

        return copy;
    }    

    public setLanguages(languages: string[]): UserModel {
        let clone = this.copy();
        clone.languages = List(languages);

        return clone;
    }

    public getAddresses(): List<AddressModel> {
        return this.addresses;
    }

    public addAddress(address: AddressModel): UserModel {
        const copy = this.copy();
        copy.addresses = copy.addresses.push(address);

        return copy;
    }

    public setAddresses(addresses: AddressModel[]): UserModel {
        let clone = this.copy();
        clone.addresses = List(addresses);

        return clone;
    }

    public getRating(): RatingModel {
        return this.rating;
    }

    public setRating(rating: RatingModel): UserModel {
        const copy = this.copy();
        copy.rating = rating;

        return copy;
    }

    public getActive(): boolean {
        return this.isActive;
    }

    public setActive(isActive: boolean): UserModel {
        const copy = this.copy();
        copy.isActive = isActive;

        return copy;
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
        copy.rating = this.rating;

        return copy;
    }
}