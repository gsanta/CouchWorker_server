
export interface AddressDocument {
    country: string;
    city: string;
    street?: string;
    house?: string;
}

export class AddressModel {
    private country: string;
    private city: string;
    private street: string;
    private house: string;

    constructor(addressDocument?: AddressDocument) {
        if (addressDocument) {
            this.country = addressDocument.country;
            this.city = addressDocument.city;
            this.street = addressDocument.street;
            this.house = addressDocument.house;
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

    private copy(): AddressModel {
        let copy = new AddressModel(null);
        copy.country = this.country;
        copy.city = this.city;
        copy.street = this.street;
        copy.house = this.house;
        return copy;
    }
}