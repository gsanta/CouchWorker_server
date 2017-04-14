
import * as Promise from 'promise';
import { UserRepository } from './repository/UserRepository';
import { QueryMetaData } from '../../repository/QueryMetaData';
import { UserModel } from '../../../shared/model/user/UserModel';
import { AddressModel } from '../../../shared/model/AddressModel';

export class UserBusiness {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public create(item: UserModel): Promise<any> {
        return this.userRepository.create(item);
    }
    
    public delete (item: UserModel): Promise<any> {
        return this.userRepository.delete(item)
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

    public findBy(item: UserModel, queryMetaData: QueryMetaData): Promise<UserModel[]> {
        return this.userRepository.findBy(item, queryMetaData);
    }

    public findAll (queryMetaData: QueryMetaData): Promise<UserModel[]> {
        return this.userRepository.findAll(queryMetaData);
    }
}
