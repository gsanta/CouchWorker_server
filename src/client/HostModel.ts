import { AddressModel } from '../domain/user/AddressModel';
import { RatingModel } from '../domain/user/RatingModel';
import { PersonalInfoModel } from '../domain/user/PersonalInfoModel';

export interface HostDocument {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    address: AddressModel;
    rating: RatingModel;
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
        this.address = hostDocument.address;
        this.rating = hostDocument.rating;
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