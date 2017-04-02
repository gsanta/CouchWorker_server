import { AddressModel, AddressDocument } from '../domain/user/AddressModel';
import { RatingModel } from '../domain/user/RatingModel';
import { PersonalInfoModel } from '../domain/user/PersonalInfoModel';

export interface HostDocument extends AddressDocument {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    rating: number;
}

export class HostModel {
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;
    private address: AddressModel;
    private rating: RatingModel;

    constructor(hostDocument: HostDocument) {
        this.firstName = hostDocument.firstName,
        this.lastName = hostDocument.lastName,
        this.birthDate = hostDocument.birthDate,
        this.email = hostDocument.email    
        this.address = new AddressModel({
            country: hostDocument.country,
            city: hostDocument.city,
            street: hostDocument.street,
            house: hostDocument.house
        });
        this.rating = new RatingModel(hostDocument.rating);
    }

    public getAddress(): AddressModel {
        return this.address;
    }

    public getRating(): RatingModel {
        return this.rating;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public getEmail(): string {
        return this.email;
    }
}