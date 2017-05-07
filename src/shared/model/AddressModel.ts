import { List } from 'immutable';
import { UrlModel, UrlDocument, UrlJson, fromUrlJson, toUrlJson, toUrlDocument, fromUrlDocument } from './UrlModel';

export interface AddressJson {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    images?: UrlJson[];
}

export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    images?: UrlDocument[];
}

export function toAddressDocument(addressModel: AddressModel): AddressDocument {
    return {
        country: addressModel.country,
        city: addressModel.city,
        street: addressModel.street,
        house: addressModel.house,
        uuid: addressModel.uuid,
        images: addressModel.images.map(image => toUrlDocument(image)).toArray()
    };
}

export function fromAddressDocument(addressDocument: AddressDocument): AddressModel {
    return {
        country: addressDocument.country,
        city: addressDocument.city,
        street: addressDocument.street,
        house: addressDocument.house,
        uuid: addressDocument.uuid,
        images: List<UrlModel>(addressDocument.images.map(image => fromUrlDocument(image)))
    };
}

export function fromAddressJson(json: AddressJson): AddressModel {
    const address = new AddressModel();
    address.country = json.country;
    address.city = json.city;
    address.street = json.street;
    address.house = json.house;
    address.uuid = json.uuid;

    const images = json.images ? json.images.map(image => fromUrlJson(image)) : [];
    address.images = List<UrlModel>(images);
    return address;
}

export function toAddressJson(addressModel: AddressModel): AddressJson {
    const images = addressModel.images.map(image => toUrlJson(image)).toArray();
    return {
        country: addressModel.country,
        city: addressModel.city,
        street: addressModel.street,
        house: addressModel.house,
        images: images,
        uuid: addressModel.uuid
    };
}

export class AddressModel {
    public country: string;
    public city: string;
    public street: string;
    public house: string;
    public uuid: string;

    public images: List<UrlModel> = List<UrlModel>();
}
