import {UserModel} from '../database/UserModel';
import {UserDocument} from '../database/UserDocument';
import {UserRepository} from './UserRepository';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

describe('UserRepository', () => {
    let userModel: UserModel;
    let userDocument: any;
    let repositoryBase: any;

    beforeEach(() => {
        userModel = new UserModel(
            'Santa Gergely',
            26,
            'Software Developer',
            'santagergely90@gmail.com',
            '1234'
        );

        userDocument = {
            name: 'Santa Gergely',
            age: 26,
            profession: 'Software Developer',
            email: 'santagergely90@gmail.com',
            id: '1234'
        };

        repositoryBase = {
            create: sinon.stub(),
            update: sinon.stub(),
            delete: sinon.stub()
        };


    });


    describe('create', () => {
        it('should call the create method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.create.returns({
                then: (callback: any) => callback(userDocument)
            });

            userRepository.create(userModel);

            expect(repositoryBase.create.callCount).toBe(1);
            expect(repositoryBase.create.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with a Promise<UserModel> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.create.returns(new Promise((resolve, reject) => {
                resolve(userDocument);
            }));

            userRepository.create(userModel)
            .then((model) => {
                expect(model).toEqual(userModel);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.create.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.create(userModel)
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });

    describe('update', () => {
        it('should call the update method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.update.returns({
                then: (callback: any) => callback(userDocument)
            });

            userRepository.update(userModel);

            expect(repositoryBase.update.callCount).toBe(1);
            expect(repositoryBase.update.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with the updated Promise<UserModel> if no error occures', (done) => {
            let updatedUserDocument = {
                name: 'Santa Gergely updated',
                age: 27,
                profession: 'Software Developer updated',
                email: 'santagergely90@gmail.com updated',
                id: '12345'
            };

            let updatedUserModel = new UserModel(
                'Santa Gergely updated',
                27,
                'Software Developer updated',
                'santagergely90@gmail.com updated',
                '12345'
            );

            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.update.returns(new Promise((resolve, reject) => {
                resolve(updatedUserDocument);
            }));

            userRepository.update(userModel)
            .then((model) => {
                expect(model).toEqual(updatedUserModel);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.update.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.update(userModel)
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });

    describe('delete', () => {
        it('should call the delete method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.delete.returns({
                then: (callback: any) => callback(userDocument)
            });

            userRepository.delete(userModel);

            expect(repositoryBase.delete.callCount).toBe(1);
            expect(repositoryBase.delete.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with a Promise<UserModel> with the deleted user if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.delete.returns(new Promise((resolve, reject) => {
                resolve();
            }));

            userRepository.delete(userModel)
            .then((model) => {
                expect(model).toEqual(userModel);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.delete.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.delete(userModel)
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });
});
