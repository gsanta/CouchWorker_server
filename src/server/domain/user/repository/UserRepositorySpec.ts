import {UserRepository} from './UserRepository';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { MongooseUserDocument } from './MongooseUserDocument';
import { Promise } from 'es6-promise';
import { UserModel, UserModelParams } from '../../../../shared/model/user/UserModel';
import { AddressModel } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';

describe('UserRepository', () => {
    let userModel: UserModel;
    let userModelParams: UserModelParams;
    let userDocument: MongooseUserDocument;
    let repositoryBase: any;
    let queryMetaData: any = sinon.spy();

    beforeEach(() => {
        userModelParams = {
            firstName: 'Santa',
            lastName: 'Gergely',
            userName: 'Santa.Gergely.0',
            birthDate: new Date(1990, 3, 1),
            email: 'santagergely90@gmail.com',
            profession: 'Software Developer',
            addresses: [
                new AddressModel({
                    country: 'Hungary',
                    city: 'Budapest',
                    street: 'Haller utca',
                    house: '15/a'
                })
            ]
        };

        userDocument = {
            firstName: 'Santa',
            lastName: 'Gergely',
            uniqueIndex: 0,
            birthDate: new Date(1990, 3, 1),
            email: 'santagergely90@gmail.com',
            profession: 'Software Developer',
            uuid: null,
            addresses: [
                {
                    country: 'Hungary',
                    city: 'Budapest',
                    street: 'Haller utca',
                    house: '15/a'
                }
            ],
            id: undefined
        };

        userModel = new UserModel(userModelParams);

        repositoryBase = {
            create: sinon.stub(),
            update: sinon.stub(),
            delete: sinon.stub(),
            findByEmail: sinon.stub(),
            findAll: sinon.stub(),
            findBy: sinon.stub()
        };


    });


    describe('create', () => {
        it('should call the create method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.create.returns({
                then: (callback: any) => callback(userModelParams)
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
            const updatedUserParams = {
                firstName: 'Santa',
                lastName: 'Gergely David',
                userName: 'Santa.Gergely David.0',
                birthDate: new Date(1990, 3, 1),
                email: 'santagergely90@gmail.com updated',
                profession: 'Software Developer updated',
                addresses: [
                    new AddressModel({
                        country: 'Hungary2',
                        city: 'Budapest2'
                    })
                ]
            };

            const updatedUserDocument = {
                firstName: 'Santa',
                lastName: 'Gergely David',
                uniqueIndex: 0,
                birthDate: new Date(1990, 3, 1),
                email: 'santagergely90@gmail.com updated',
                profession: 'Software Developer updated',
                addresses: [{
                    country: 'Hungary2',
                    city: 'Budapest2'
                }]
            };

            const updatedUserModel = new UserModel(updatedUserParams);

            const userRepository = new UserRepository(repositoryBase);
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
                then: (callback: any) => callback(userModelParams)
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

    describe('findAll', () => {
        let userDocument2: UserDocument;
        let userModelParams2: UserModelParams;
        let userModel2: any;

        beforeEach(() => {
            userDocument2 = {
                firstName: 'Santa',
                lastName: 'Gergely2',
                uniqueIndex: 1,
                birthDate: null,
                profession: 'Software Developer2',
                uuid: null,
                email: 'santagergely90@gmail.com2',
                addresses: [{
                    country: 'Hungary2',
                    city: 'Budapest2'
                }]
            };

            userModelParams2 = {
                firstName: 'Santa',
                lastName: 'Gergely2',
                userName: 'Santa.Gergely2.1',
                birthDate: null,
                profession: 'Software Developer2',
                email: 'santagergely90@gmail.com2',
                addresses: [new AddressModel({
                    country: 'Hungary2',
                    city: 'Budapest2'
                })]
            }

            userModel2 = new UserModel(userModelParams2);
        });

        it('should call the findAll method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);

            repositoryBase.findAll.returns({
                then: (callback: any) => callback([userDocument, userDocument2])
            });

            userRepository.findAll(queryMetaData);

            expect(repositoryBase.findAll.callCount).toBe(1);
            expect(repositoryBase.findAll.calledWith(queryMetaData)).toBe(true);
        });

        it('should return with a Promise<UserModel[]> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findAll
                .returns(new Promise((resolve, reject) => {
                    resolve([userDocument, userDocument2]);
                }));

            userRepository.findAll(queryMetaData)
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

            userRepository.findAll(queryMetaData)
            .then(() => done.fail('This Promise should have been rejected'))
            .catch((error: any) => {
                expect(error).toEqual('Error happened');
                done();
            });
        });
    });

    describe('findBy', () => {
        let userDocument2: UserDocument;
        let userModelParams2: UserModelParams;
        let userModel2: any;

        beforeEach(() => {
            userDocument2 = {
                firstName: 'Santa',
                lastName: 'Gergely2',
                uuid: null,
                uniqueIndex: 1,
                birthDate: null,
                profession: 'Software Developer2',
                email: 'santagergely90@gmail.com2',
                addresses: [{
                    country: 'Hungary2',
                    city: 'Budapest2'
                }]
            };

            userModelParams2 = {
                firstName: 'Santa',
                lastName: 'Gergely2',
                userName: 'Santa.Gergely2.1',
                birthDate: null,
                profession: 'Software Developer2',
                email: 'santagergely90@gmail.com2',
                addresses: [new AddressModel({
                    country: 'Hungary2',
                    city: 'Budapest2'
                })]
            }

            userModel2 = new UserModel(userModelParams2);
        });

        it('should call the findBy method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);

            repositoryBase.findBy.withArgs(userDocument).returns({
                then: (callback: any) => callback([userDocument, userDocument2])
            });

            userRepository.findBy(userModel, queryMetaData);

            expect(repositoryBase.findBy.callCount).toBe(1);
            expect(repositoryBase.findBy.calledWith(userDocument, queryMetaData)).toBe(true);
        });

        it('should return with a Promise<UserModel[]> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase);
            repositoryBase.findBy
                .withArgs(userDocument)
                .returns(new Promise((resolve, reject) => {
                    resolve([userDocument, userDocument2]);
                }));

            userRepository.findBy(userModel, queryMetaData)
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
            repositoryBase.findBy
                .withArgs(userDocument)
                .returns(new Promise((resolve, reject) => {
                    reject('Error happened');
                }));

            userRepository.findBy(userModel, queryMetaData)
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
                then: (callback: any) => callback(userModelParams)
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
});
