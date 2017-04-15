import { RepositoryBase } from '../../../repository/RepositoryBase';
import { MongooseUserDocument } from './MongooseUserDocument';
import { QueryMetaData } from '../../../repository/QueryMetaData';
import { UserModel } from '../../../../shared/model/user/UserModel';
import { AddressModel, AddressDocument } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import * as uuid from 'uuid/v4';

export class UserRepository {
    private repoBase: RepositoryBase<UserDocument>;
    private createUniqueId: () => string;

    constructor (repoBase: RepositoryBase<UserDocument>, createUniqueId: () => string) {
        this.repoBase = repoBase;
        this.createUniqueId = createUniqueId;
    }

    public create (user: UserModel): Promise<UserModel> {
        user = user.setUuid(this.createUniqueId());        
        const userDocument = this.toUserDocument(user);
        return this.repoBase.create(userDocument)
            .then(userDocument => UserRepository.toUserModel(userDocument));
    }

    public update(user: UserModel): Promise<UserModel> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.update(userDocument)
            .then(userDocument => UserRepository.toUserModel(userDocument));
    }

    public delete(user: UserModel): Promise<UserModel> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.delete(userDocument)
            .then(() => user);
    }
    
    public findBy(user: UserModel, queryMetaData: QueryMetaData): Promise<UserModel[]> {
        const userDocument = this.toUserDocument(user);
        return this.repoBase.findBy(userDocument, queryMetaData)
            .then(docs => docs.map(doc => UserRepository.toUserModel(doc)));
    }

    public findAll(queryMetaData: QueryMetaData): Promise<UserModel[]> {
        return this.repoBase.findAll(queryMetaData)
            .then(docs => docs.map(doc => UserRepository.toUserModel(doc)));
    }

    public findByEmail(email: string): Promise<UserModel> {
        return this.repoBase.findByEmail(email)
            .then(userDocument => UserRepository.toUserModel(userDocument));
    }

    public findByUserName(userName: string): Promise<UserModel> {
        return this.repoBase.findByUserName(userName)
            .then(userDocument => UserRepository.toUserModel(userDocument));
    }

    private toUserDocument(userModel: UserModel): UserDocument {
        return <UserDocument> {
            firstName: userModel.getFirstName(),
            lastName: userModel.getLastName(),
            email: userModel.getEmail(),       
            uniqueIndex: 0,     
            birthDate: userModel.getBirthDate(),            
            profession: userModel.getProfession(),
            addresses: userModel.getAddresses().map(address => UserRepository.toAddressDocument(address)).toArray(),
            uuid: userModel.getUuid()
        }
    }

    private static toAddressDocument(addressModel: AddressModel): AddressDocument {
        return {
            country: addressModel.getCountry(),
            city: addressModel.getCity(),
            street: addressModel.getStreet(),
            house: addressModel.getHouse()
        }
    }

    public static toUserModel(userDocument: UserDocument): UserModel {
        const addresses = userDocument.addresses ? userDocument.addresses.map(address => this.toAddressModel(address)) : null;
        const userParams = {
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,       
            userName: `${userDocument.firstName}.${userDocument.lastName}.${userDocument.uniqueIndex}`,     
            birthDate: userDocument.birthDate,            
            profession: userDocument.profession,
            addresses: addresses,
            uuid: userDocument.uuid
        }

        return new UserModel(userParams);
    }

    private static toAddressModel(addressDocument: AddressDocument): AddressModel {
        return new AddressModel(addressDocument);
    }
}
