import { UserDocument } from './UserDocument';
import { AddressModel, AddressJson, fromAddressDocument, fromAddressJson, toAddressJson, toAddressDocument } from '../AddressModel';
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

export function toUserDocument(userModel: UserModel): UserDocument {
    const uniqueIndex = parseInt(userModel.userName.split('.')[2], 10);
    return {
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        email: userModel.email,
        uniqueIndex: uniqueIndex,
        birthDate: userModel.birthDate,
        registrationDate: userModel.registrationDate,
        profession: userModel.profession,
        country: userModel.country,
        city: userModel.city,
        isActive: userModel.isActive,
        uuid: userModel.uuid,
        languages: userModel.languages.toArray(),
        addresses: userModel.addresses.map(address => toAddressDocument(address)).toArray()
    };
}

export function fromUserDocument(userDocument: UserDocument): UserModel {
    const userModel = new UserModel();
    const addresses = userDocument.addresses ? userDocument.addresses.map(address => fromAddressDocument(address)) : [];
    userModel.addresses = List<AddressModel>(addresses);
    userModel.firstName = userDocument.firstName;
    userModel.lastName = userDocument.lastName;
    userModel.email = userDocument.email;
    userModel.userName = `${userDocument.firstName}.${userDocument.lastName}.${userDocument.uniqueIndex}`;
    userModel.birthDate = userDocument.birthDate;
    userModel.registrationDate = userDocument.registrationDate;
    userModel.profession = userDocument.profession;
    userModel.country = userDocument.country;
    userModel.city = userDocument.city;
    userModel.rating = {rating: 5};
    userModel.isActive = userDocument.isActive;
    userModel.uuid = userDocument.uuid;
    userModel.languages = List<string>(userDocument.languages);

    return userModel;
}

export function fromUserJson(json: UserJson): UserModel {
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

    if (json.addresses) {
        const addresses = json.addresses.map(address => fromAddressJson(address));
        userModel.addresses = List<AddressModel>(addresses);
    }

    userModel.rating = {rating: json.rating};
    userModel.isActive = json.isActive;

    return userModel;
}

export function toUserJson(userModel: UserModel): UserJson {
    const addresses = userModel.addresses.map(address => toAddressJson(address)).toArray();
    return {
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        userName: userModel.userName,
        birthDate: userModel.birthDate.toJSON(),
        email: userModel.email,
        profession: userModel.profession,
        country: userModel.country,
        city: userModel.city,
        languages: userModel.languages.toArray(),
        addresses: addresses,
        rating: userModel.rating.rating,

        registrationDate: userModel.registrationDate.toJSON(),
        isActive: userModel.isActive,
        uuid: userModel.uuid
    };
}

export class UserModel {

    constructor() {
        this.addresses = List<AddressModel>();
    }
    public firstName: string;
    public lastName: string;
    public userName: string;
    public birthDate: Date;
    public email: string;
    public profession: string;
    public country: string;
    public city: string;
    public languages: List<string>;
    public addresses: List<AddressModel>;
    public rating: RatingModel;

    public registrationDate: Date;
    public isActive: boolean;
    public uuid: string;
}
