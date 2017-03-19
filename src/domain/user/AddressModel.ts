
export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
}

export class AddressModel {
    private addressDocument: AddressDocument;

    constructor(addressDocument: AddressDocument) {
        this.addressDocument = addressDocument;
    }

    public getCountry() {
        return this.addressDocument.country;
    }

    public getCity() {
        return this.addressDocument.city;
    }

    public getStreet() {
        return this.addressDocument.street;
    }

    public getHouse() {
        return this.addressDocument.house;
    }
}