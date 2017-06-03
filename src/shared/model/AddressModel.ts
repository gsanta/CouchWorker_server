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
        ...addressModel,
        images: addressModel.images.map(image => toUrlDocument(image))
    };
}

export function fromAddressDocument(addressDocument: AddressDocument): AddressModel {
    return <AddressModel> {
        ...addressDocument,
        images: addressDocument.images.map(image => fromUrlDocument(image))
    };
}

export function fromAddressJson(json: AddressJson): AddressModel {
    const images = json.images ? json.images.map(image => fromUrlJson(image)) : [];

    return <AddressModel> {
        ...json,
        images: images
    };
}

export function toAddressJson(addressModel: AddressModel): AddressJson {
    const images = addressModel.images.map(image => toUrlJson(image));

    return <AddressJson> {
        ...addressModel,
        images
    };
}

export class AddressModel {
    public country: string;
    public city: string;
    public street: string;
    public house: string;
    public uuid: string;
    public state: ModelState;

    public images: UrlModel[] = [];
}
