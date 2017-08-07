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

export function splitUserName(userName: string) {
    const parts = userName.split('.');
    return {
        firstName: parts[0],
        lastName: parts[1],
        uniqueIndex: parseInt(userName.split('.')[2], 10)
    };
}

export function toUserDocument(userModel: UserModel): UserDocument {
    const uniqueIndex = userModel.userName ? parseInt(userModel.userName.split('.')[2], 10) : undefined;
    const {userName, rating, ...rest} = userModel;
    return {
        ...rest,
        uniqueIndex,
        languages: userModel.languages ? userModel.languages : [],
        addresses: userModel.addresses.map(address => toAddressDocument(address))
    };
}

export function fromUserDocument(userDocument: UserDocument): UserModel {
    const addresses = userDocument.addresses ? userDocument.addresses.map(address => fromAddressDocument(address)) : [];

    const userModel = <UserModel> {
        ...userDocument,
        uuid: userDocument.uuid,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        birthDate: userDocument.birthDate,
        registrationDate: userDocument.registrationDate,
        email: userDocument.email,
        profession: userDocument.profession,
        country: userDocument.country,
        city: userDocument.city,
        isActive: userDocument.isActive,
        rating: {rating: 5},
        userName: `${userDocument.firstName}.${userDocument.lastName}.${userDocument.uniqueIndex}`,
        languages: userDocument.languages,
        addresses: addresses
    };

    return userModel;
}

export function fromUserJson(json: UserJson): UserModel {
    let addresses = [];
    if (json.addresses) {
        addresses = json.addresses.map(address => fromAddressJson(address));
    }

    const userModel = <UserModel> {
        ...json,
        birthDate: json.birthDate ? new Date(json.birthDate) : null,
        registrationDate: json.registrationDate ? new Date(json.registrationDate) : null,
        languages: json.languages ? json.languages : [],
        addresses: addresses,
        rating: {rating: json.rating || 0},
        isActive: json.isActive !== undefined ? json.isActive : true
    };

    return userModel;
}

export function toUserJson(userModel: UserModel): UserJson {
    const addresses = userModel.addresses.map(address => toAddressJson(address));

    return {
        ...userModel,
        birthDate: userModel.birthDate ? userModel.birthDate.toJSON() : null,
        registrationDate: userModel.registrationDate ? userModel.registrationDate.toJSON() : null,
        languages: userModel.languages,
        addresses: addresses,
        rating: userModel.rating.rating
    };
}

export class UserModel {
    public firstName: string;
    public lastName: string;
    public userName: string;
    public birthDate: Date;
    public email: string;
    public profession: string;
    public country: string;
    public city: string;
    public languages: string[];
    public addresses: AddressModel[] = [];
    public rating: RatingModel;

    public registrationDate: Date;
    public isActive: boolean;
    public uuid: string;
}
