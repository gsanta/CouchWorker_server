import * as Promise from 'promise';
import { UserRepository } from './repository/UserRepository';
import { PaginationModel } from '../../repository/PaginationModel';
import { UserModel, splitUserName } from '../../../shared/model/user/UserModel';
import { AddressModel } from '../../../shared/model/AddressModel';
import { ImageModel } from '../../../shared/model/image/ImageModel';

export class UserBusiness {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public create(item: UserModel): Promise<any> {
        return this.userRepository.create(item);
    }

    public addAddress(user: UserModel, address: AddressModel) {
        const addresses = user.addresses.push(address);
        user = {...user, addresses: addresses };
        console.log(address);
        return this.userRepository.update(user);
    }

    public findAddress(uuid: string): any {
        return this.userRepository.findAddressByUuid(null, uuid);
    }

    public updateAddress(userName: string, address: AddressModel) {
        return this.userRepository.updateAddress(userName, address);
    }

    public delete (item: UserModel): Promise<any> {
        return this.userRepository.delete(item);
    }

    public deleteAddress(userName: string, addressUuid: string) {
        return this.userRepository.deleteAddress(userName, addressUuid);
    }

    public update (item: UserModel): Promise<any> {
        return this.userRepository.update(item);
    }

    public findAddressByUuid(userName: string, addressUuid: string) {
        const { firstName, lastName, uniqueIndex } = splitUserName(userName);
        return this.userRepository.findByQuery({
            ...splitUserName(userName),
            'addresses.uuid': addressUuid
        });
    }

    public findByEmail(email: string): Promise<UserModel> {
        return this.userRepository.findByEmail(email);
    }

    public findByUserName(userName: string): Promise<UserModel> {
        return this.userRepository.findByUserName(userName);
    }

    public findBy(item: UserModel, pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findByUser(item, pagination);
    }

    public findAll (pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findAll(pagination);
    }

    public findByText(searchText: string, pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findByText(searchText, pagination);
    }
}
