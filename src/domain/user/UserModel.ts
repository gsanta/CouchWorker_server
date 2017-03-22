import { UserDocument } from './UserDocument';
import { AddressModel } from './AddressModel';
import { PersonalInfoModel } from './PersonalInfoModel';

export class UserModel {
    private profession: string;
    private uuid: string;
    private personalInfo: PersonalInfoModel;
    private address: AddressModel;

    constructor(userDocument?: UserDocument) {
        if (userDocument) {
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
    }

    public getProfession(): string {
        return this.profession;
    }

    public setProfession(profession: string): UserModel {
        let clone = this.copy();
        clone.profession = profession;

        return clone;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): UserModel {
        let clone = this.copy();
        clone.uuid = uuid;

        return clone;
    }

    public getPersonalInfo(): PersonalInfoModel {
        return this.personalInfo;
    }

    public setPersonalInfo(personalInfo: PersonalInfoModel): UserModel {
        let clone = this.copy();
        clone.personalInfo = personalInfo;

        return clone;
    }

    public getAddress(): AddressModel {
        return this.address;
    }

    public setAddress(address: AddressModel): UserModel {
        let clone = this.copy();
        clone.address = address;

        return clone;
    }

    private copy(): UserModel {
        let clone = new UserModel(null);
        clone.profession = this.profession;
        clone.uuid = this.uuid;
        clone.personalInfo = this.personalInfo;
        clone.address = this.address;

        return clone;
    }
}