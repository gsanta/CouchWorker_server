import {UserRegistrationModel} from "./user/rest/UserRegistrationModel";
import {UserRepository} from "../repository/UserRepository";
import {UserModel} from "../database/UserModel";
import * as Promise from 'promise';

export class UserBusiness {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public create(item: UserModel): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRepository.create(item, (data, error) => {
                if (error) {
                    console.log(data)
                    console.log(error);
                    reject(error);
                }

                resolve(data);
            });
        });
    }

    public delete (item: UserModel): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRepository.delete(item, (data, error) => {
                if (error) {
                    reject(error);
                }

                resolve(data);
            });
        });
    }

    public update (item: UserModel): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRepository.update(item, (data, error) => {
                if (error) {
                    reject(error);
                }

                resolve(data);
            });
        });
    }

    public findByEmail(email: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            this.userRepository.findByEmail(email, (data, error) => {
                if (error) {
                    reject(error);
                }

                resolve(data);
            });
        });
    }

    findAll (callback: (error: any, result: any) => void) {
        this.userRepository.findAll(callback)
    }
}
