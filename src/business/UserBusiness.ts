import {UserRepository} from "../repository/UserRepository";
import {UserModel} from "../database/UserModel";

export class UserBusiness {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    create(item: UserModel, callback: (error: any, result: any) => void) {
        this.userRepository.create(item, callback);
    }

    findAll (callback: (error: any, result: any) => void) {
        this.userRepository.findAll(callback)
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this.userRepository.delete(_id, callback);
    }
}
