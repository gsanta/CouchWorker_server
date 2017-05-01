import { List } from 'immutable';
import { UrlModel, UrlDocument, UrlJson } from './UrlModel';

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

export interface AddressJson {
    country: string;
    city: string;
    street?: string;
    house?: string;
    uuid: string;
    images?: UrlJson[]
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

    public toDocument(): AddressDocument {
        return {
            country: this.country,
            city: this.city,
            street: this.street,
            house: this.house,
            uuid: this.uuid,
            images: this.images.map(image => image.toDocument()).toArray()
        }
    }

    public static fromJson(json: AddressJson): AddressModel {
        const address = new AddressModel();
        address.country = json.country;
        address.city = json.city;
        address.street = json.street;
        address.house = json.house;
        address.uuid = json.uuid;

        const images = json.images.map(image => UrlModel.fromJson(image));
        address.images = List<UrlModel>(images); 
        return address;
    }

    public static toJson(addressModel: AddressModel): AddressJson {
        const images = addressModel.images.map(image => UrlModel.toJson(image)).toArray();
        return {
            country: addressModel.country,
            city: addressModel.city,
            street: addressModel.street,
            house: addressModel.house,
            images: images,
            uuid: addressModel.uuid
        }
    }

    private copy(): AddressModel {
        let copy = new AddressModel(null);
        copy.country = this.country;
        copy.city = this.city;
        copy.street = this.street;
        copy.house = this.house;
        copy.images = this.images;
        return copy;
    }
}