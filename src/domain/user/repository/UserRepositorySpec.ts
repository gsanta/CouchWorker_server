import {UserRepository} from './UserRepository';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { UserModel } from '../UserModel';
import { MongooseUserDocument } from './MongooseUserDocument';

describe('UserRepository', () => {
    let userModel: UserModel;
    let userDocument: MongooseUserDocument;
    let repositoryBase: any;

    beforeEach(() => {
        userDocument = <MongooseUserDocument> {
            name: 'Santa Gergely',
            age: 26,
            profession: 'Software Developer',
            email: 'santagergely90@gmail.com',
            id: '1234',
            address: {
                country: 'Hungary',
                city: 'Budapest',
                street: 'Haller utca',
                house: '15/a'
            }
        };

        userModel = new UserModel(userDocument);

        repositoryBase = {
            create: sinon.stub(),
            update: sinon.stub(),
            delete: sinon.stub(),
            findByEmail: sinon.stub(),
            findAll: sinon.stub()
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
                id: '12345',
                address: {
                    country: 'Hungary2',
                    city: 'Budapest2'
                }
            };

            let updatedUserModel = new UserModel(updatedUserDocument);

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

    describe('findByEmail', () => {
        let email = 'abcd';

        it('should call the findByEmail method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);

            repositoryBase.findByEmail.returns({
                then: (callback: any) => callback(userDocument)
            });

            userRepository.findByEmail(email);

            expect(repositoryBase.findByEmail.callCount).toBe(1);
            expect(repositoryBase.findByEmail.getCall(0).args[0]).toEqual(email);
        });

        it('should return with a Promise<UserModel> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findByEmail
                .withArgs(email)
                .returns(new Promise((resolve, reject) => {
                    resolve(userDocument);
                }));

            userRepository.findByEmail(email)
            .then((model) => {
                expect(model).toEqual(userModel);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findByEmail.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.findByEmail(email)
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });

    describe('findAll', () => {
        let userDocument2: any;
        let userModel2: any;

        beforeEach(() => {
            userDocument2 = {
                name: 'Santa Gergely2',
                age: 27,
                profession: 'Software Developer2',
                email: 'santagergely90@gmail.com2',
                id: '12345',
                address: {
                    country: 'Hungary2',
                    city: 'Budapest2'
                }
            };

            userModel2 = new UserModel(userDocument2);
        });

        it('should call the findAll method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);

            repositoryBase.findAll.returns({
                then: (callback: any) => callback([userDocument, userDocument2])
            });

            userRepository.findAll();

            expect(repositoryBase.findAll.callCount).toBe(1);
        });

        it('should return with a Promise<UserModel[]> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findAll
                .returns(new Promise((resolve, reject) => {
                    resolve([userDocument, userDocument2]);
                }));

            userRepository.findAll()
            .then((models) => {
                expect(models.length).toEqual(2);
                expect(models[0]).toEqual(userModel);
                expect(models[1]).toEqual(userModel2);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findAll.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.findAll()
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });
});
