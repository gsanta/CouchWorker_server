import {UserDocument, AddressDocument} from './UserDocument';
import {AddressModel} from './AddressModel';

export class UserModel {
    private name: string;
    private age: number;
    private profession: string;
    private email: string
    private uuid: string;
    private address: AddressModel;

    constructor(userDocument: UserDocument) {
        this.name = userDocument.name;
        this.age = userDocument.age;
        this.profession = userDocument.profession;
        this.email = userDocument.email;
        this.uuid = userDocument.id;
        this.address = new AddressModel(userDocument.address);
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public getProfession(): string {
        return this.profession;
    }

    public getEmail(): string {
        return this.email;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getAddress(): AddressModel {
        return this.address;
    }
}