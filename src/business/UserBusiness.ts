import {UserRegistrationModel} from "./user/rest/UserRegistrationModel";
import {UserRepository} from "../repository/UserRepository";
import {UserModel} from "./UserModel";
import * as Promise from 'promise';

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

    public findAll (): Promise<UserModel[]> {
        return this.userRepository.findAll();
    }
}
