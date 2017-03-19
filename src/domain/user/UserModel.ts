import { UserDocument } from './UserDocument';
import { AddressModel } from './AddressModel';
import { PersonalInfoModel } from './PersonalInfoModel';

export class UserModel {
    private profession: string;
    private uuid: string;
    private personalInfo: PersonalInfoModel;
    private address: AddressModel;

    constructor(userDocument: UserDocument) {
        this.profession = userDocument.profession;
        this.uuid = userDocument.id;
        this.personalInfo = new PersonalInfoModel(
            userDocument.firstName,
            userDocument.lastName,
            userDocument.birthDate,
            userDocument.email                        
        );
        this.address = new AddressModel({
            country: userDocument.country,
            city: userDocument.city,
            street: userDocument.street,
            house: userDocument.house
        });
    }

    public getProfession(): string {
        return this.profession;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getPersonalInfo(): PersonalInfoModel {
        return this.personalInfo;
    }

    public getAddress(): AddressModel {
        return this.address;
    }
}