import { UserDocument } from './UserDocument';
import { AddressModel, AddressJson } from '../AddressModel';
import { List } from 'immutable';
import { RatingModel } from '../RatingModel';

export interface UserJson {
    uuid: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthDate: string;
    registrationDate: string;
    email: string;
    profession: string;
    country: string;
    city: string;
    languages: string[];
    addresses: AddressJson[];
    rating: number;
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

    constructor(userDocument?: UserDocument) {
        if (!userDocument) {
            this.addresses = List<AddressModel>();
            this.languages = List<string>();            
        } else {
            const addresses = userDocument.addresses ? userDocument.addresses.map(address => new AddressModel(address)) : [];
            this.addresses = List<AddressModel>(addresses);
            this.firstName = userDocument.firstName;
            this.lastName = userDocument.lastName;
            this.email = userDocument.email;       
            this.userName = `${userDocument.firstName}.${userDocument.lastName}.${userDocument.uniqueIndex}`;     
            this.birthDate = userDocument.birthDate;
            this.registrationDate = userDocument.registrationDate;            
            this.profession = userDocument.profession;
            this.country = userDocument.country;
            this.city = userDocument.city;
            this.rating = new RatingModel(5);
            this.isActive = userDocument.isActive;
            this.uuid = userDocument.uuid;
            this.languages = List<string>(userDocument.languages)
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

    public toDocument(): UserDocument {
        const uniqueIndex = parseInt(this.userName.split('.')[2], 10);
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            uniqueIndex: uniqueIndex,
            birthDate: this.birthDate,
            registrationDate: this.registrationDate,
            profession: this.profession,
            country: this.country,
            city: this.city,
            isActive: this.isActive,
            uuid: this.uuid,
            languages: this.languages.toArray(),
            addresses: this.addresses.map(address => address.toDocument()).toArray()
        }
    }

    public static fromJson(json: UserJson): UserModel {
        const userModel = new UserModel();
        userModel.uuid = json.uuid;
        userModel.firstName = json.firstName;
        userModel.lastName = json.lastName;
        userModel.userName = json.userName;
        userModel.birthDate = new Date(json.birthDate);
        userModel.registrationDate = new Date(json.registrationDate);
        userModel.email = json.email;
        userModel.profession = json.profession;
        userModel.country = json.country;
        userModel.city = json.city;
        userModel.languages = List<string>(json.languages);

        const addresses = json.addresses.map(address => AddressModel.fromJson(address));
        userModel.addresses = List<AddressModel>(addresses);
        userModel.rating = new RatingModel(json.rating);
        userModel.isActive = json.isActive;
        
        return userModel;
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
        copy.city = this.city;
        copy.country = this.country;
        copy.userName = this.userName;
        copy.languages = this.languages;
        copy.isActive = this.isActive;
        copy.registrationDate = this.registrationDate;

        return copy;
    }
}