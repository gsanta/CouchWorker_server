import * as Promise from 'promise';
import { UserRepository } from './repository/UserRepository';
import { PaginationModel } from '../../repository/PaginationModel';
import { UserModel } from '../../../shared/model/user/UserModel';
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
        user = user.addAddress(address);

        return this.userRepository.update(user);
    }
    
    public delete (item: UserModel): Promise<any> {
        return this.userRepository.delete(item);
    }

    public update (item: UserModel): Promise<any> {
        return this.userRepository.update(item);
    }

    public findByEmail(email: string): Promise<UserModel> {
        return this.userRepository.findByEmail(email);
    }

    public findByUserName(userName: string): Promise<UserModel> {
        return this.userRepository.findByUserName(userName);
    }

    public findBy(item: UserModel, pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findBy(item, pagination);
    }

    public findAll (pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findAll(pagination);
    }

    public findByText(searchText: string, pagination: PaginationModel): Promise<UserModel[]> {
        return this.userRepository.findByText(searchText, pagination);
    }
}
