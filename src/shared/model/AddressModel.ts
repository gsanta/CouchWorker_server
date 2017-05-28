import { List } from 'immutable';
import { UrlModel, UrlDocument, UrlJson, fromUrlJson, toUrlJson, toUrlDocument, fromUrlDocument } from './UrlModel';
import { ModelState } from './ModelState';

export interface AddressJson {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    state: number;
    images?: UrlJson[];
}

export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    state: number;
    images?: UrlDocument[];
}

export function toAddressDocument(addressModel: AddressModel): AddressDocument {
    return {
        country: addressModel.country,
        city: addressModel.city,
        street: addressModel.street,
        house: addressModel.house,
        uuid: addressModel.uuid,
        state: addressModel.state,
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
        state: addressDocument.state,
        images: List<UrlModel>(addressDocument.images.map(image => fromUrlDocument(image)))
    };
}

export function fromAddressJson(json: AddressJson): AddressModel {
    const images = json.images ? json.images.map(image => fromUrlJson(image)) : [];

    return {
        country: json.country,
        city: json.city,
        street: json.street,
        house: json.house,
        uuid: json.uuid,
        state: json.state,
        images: List<UrlModel>(images)
    };
}

export function toAddressJson(addressModel: AddressModel): AddressJson {
    const images = addressModel.images.map(image => toUrlJson(image)).toArray();
    return {
        country: addressModel.country,
        city: addressModel.city,
        street: addressModel.street,
        house: addressModel.house,
        images: images,
        uuid: addressModel.uuid,
        state: addressModel.state
    };
}

export class AddressModel {
    public country: string;
    public city: string;
    public street: string;
    public house: string;
    public uuid: string;
    public state: ModelState;

    public images: List<UrlModel> = List<UrlModel>();
}
