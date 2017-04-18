import { List } from 'immutable';
import { UrlModel, UrlDocument } from './UrlModel';

export function jsonToAddressModel(json: any): AddressModel {
    const addressDocument: AddressDocument = {        
        country: json.country,
        city: json.city,
        street: json.street,
        house: json.house,
        uuid: json.uuid
    };

   return new AddressModel(addressDocument);
}

export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    images?: UrlDocument[]
}

export class AddressModel {
    private country: string;
    private city: string;
    private street: string;
    private house: string;
    private uuid: string;

    private images: List<UrlModel> = List<UrlModel>();

    constructor(addressDocument?: AddressDocument) {
        if (addressDocument) {
            this.country = addressDocument.country;
            this.city = addressDocument.city;
            this.street = addressDocument.street;
            this.house = addressDocument.house;
            this.uuid = addressDocument.uuid;
            this.images = addressDocument.images ? 
                List<UrlModel>(addressDocument.images.map(urlDocument => new UrlModel(urlDocument))) : List<UrlModel>();
        }
    }

    public getCountry() {
        return this.country;
    }

    public setCountry(country: string): AddressModel {
        let copy = this.copy();
        copy.country = country;
        return copy;
    }

    public getCity() {
        return this.city;
    }

    public setCity(city: string): AddressModel {
        let copy = this.copy();
        copy.city = city;
        return copy;
    }

    public getStreet() {
        return this.street;
    }

    public setStreet(street: string): AddressModel {
        let copy = this.copy();
        copy.street = street;
        return copy;
    }

    public getHouse() {
        return this.house;
    }

    public setHouse(house: string): AddressModel {
        let copy = this.copy();
        copy.house = house;
        return copy;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): AddressModel {
        let clone = this.copy();
        clone.uuid = uuid;

        return clone;
    }

    public setImages(images: List<UrlModel>) {
        let clone = this.copy();
        clone.images = images;

        return clone;
    }

    public getImages(): List<UrlModel> {
        return this.images;
    }

    private copy(): AddressModel {
        let copy = new AddressModel(null);
        copy.country = this.country;
        copy.city = this.city;
        copy.street = this.street;
        copy.house = this.house;
        return copy;
    }
}