import { AddressModel } from '../domain/user/AddressModel';
import { RatingModel } from '../domain/user/RatingModel';
import { PersonalInfoModel } from '../domain/user/PersonalInfoModel';

export class HostModel {
    private address: AddressModel;
    private rating: RatingModel;
    private personalInfo: PersonalInfoModel;

    constructor(personalInfo: PersonalInfoModel, address: AddressModel, rating: RatingModel) {
        this.address = address;
        this.rating = rating;
        this.personalInfo = personalInfo;
    }

    public getAddress(): AddressModel {
        return this.address;
    }

    public getRating(): RatingModel {
        return this.rating;
    }

    public getPersonalInfo(): PersonalInfoModel {
        return this.personalInfo;
    }
}