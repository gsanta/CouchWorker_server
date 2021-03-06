import {UserRepository} from './UserRepository';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { MongooseUserDocument } from './MongooseUserDocument';
import { Promise } from 'es6-promise';
import { UserModel, fromUserDocument } from '../../../../shared/model/user/UserModel';
import { AddressModel } from '../../../../shared/model/AddressModel';
import { UserDocument } from '../../../../shared/model/user/UserDocument';
import { ModelState } from '../../../../shared/model/ModelState';

describe('UserRepository', () => {
    let userModel: UserModel;
    let userDocument: UserDocument;
    let userModel2: UserModel;
    let userDocument2: UserDocument;
    let repositoryBase: any;
    let pagination: any = sinon.spy();

    beforeEach(() => {
        userDocument = {
            firstName: 'Santa',
            lastName: 'Gergely',
            uniqueIndex: 0,
            birthDate: new Date(1990, 3, 1),
            registrationDate: new Date(2000, 2, 1),
            email: 'santagergely90@gmail.com',
            profession: 'Software Developer',
            country: 'Hungary',
            city: 'Budapest',
            uuid: null,
            languages: ['hungarian', 'english'],
            addresses: [
                {
                    country: 'Hungary',
                    city: 'Budapest',
                    street: 'Haller utca',
                    house: '15/a',
                    uuid: null,
                    images: [],
                    state: ModelState.ACTIVE
                }
            ],
            isActive: true
        };

        userDocument2 = {
                firstName: 'Santa',
                lastName: 'Gergely David',
                uniqueIndex: 0,
                birthDate: new Date(1990, 3, 1),
                registrationDate: new Date(2000, 2, 1),
                email: 'santagergely90@gmail.com updated',
                profession: 'Software Developer updated',
                country: 'Hungary',
                city: 'Budapest',
                uuid: null,
                languages: ['hungarian', 'english'],
                addresses: [{
                    country: 'Hungary2',
                    city: 'Budapest2',
                    uuid: null,
                    images: [],
                    state: ModelState.ACTIVE
                }],
                isActive: true
            };

        userModel = fromUserDocument(userDocument);
        userModel2 = fromUserDocument(userDocument2);

        repositoryBase = {
            create: sinon.stub(),
            update: sinon.stub(),
            delete: sinon.stub(),
            findAll: sinon.stub(),
            findBy: sinon.stub(),
            findOneBy: sinon.stub()
        };
    });


    describe('create', () => {
        it('should call the create method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.create.returns(new Promise((resolve, reject) => {
                resolve(null);
            }));

            userRepository.create(userModel);

            expect(repositoryBase.create.callCount).toBe(1);
            expect(repositoryBase.create.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with a Promise<UserModel> if no error occurs', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
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

        it('should return with a rejected Promise if an error occurs', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
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
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.update.returns(new Promise((resolve, reject) => {
                resolve(userDocument);
            }));
            userRepository.update(userModel);

            expect(repositoryBase.update.callCount).toBe(1);
            expect(repositoryBase.update.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with the updated Promise<UserModel> if no error occures', (done) => {
            const userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.update.returns(new Promise((resolve, reject) => {
                resolve(userDocument2);
            }));

            userRepository.update(userModel)
            .then((model) => {
                expect(model).toEqual(userModel2);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
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
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.delete.returns(new Promise((resolve, reject) => {
                resolve(userDocument);
            }));

            userRepository.delete(userModel);

            expect(repositoryBase.delete.callCount).toBe(1);
            expect(repositoryBase.delete.getCall(0).args[0]).toEqual(userDocument);
        });

        it('should return with a Promise<UserModel> with the deleted user if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
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
            let userRepository = new UserRepository(repositoryBase, () => null);
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
        it('should call the findAll method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase, () => null);

            repositoryBase.findAll.returns({
                then: (callback: any) => callback([userDocument, userDocument2])
            });

            userRepository.findAll(pagination);

            expect(repositoryBase.findAll.callCount).toBe(1);
            expect(repositoryBase.findAll.calledWith(pagination)).toBe(true);
        });

        it('should return with a Promise<UserModel[]> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.findAll
                .returns(new Promise((resolve, reject) => {
                    resolve([userDocument, userDocument2]);
                }));

            userRepository.findAll(pagination)
            .then((models) => {
                expect(models.length).toEqual(2);
                expect(models[0]).toEqual(userModel);
                expect(models[1]).toEqual(userModel2);
                done();
            })
            .catch(() => done.fail('This Promise should have been resolved'));
        });

        it('should return with a rejectet Promise if an error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.findAll.returns(new Promise((resolve, reject) => {
                reject('Error happened');
            }));

            userRepository.findAll(pagination)
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
            let userRepository = new UserRepository(repositoryBase, () => null);

            repositoryBase.findOneBy.returns({
                then: (callback: any) => callback(userDocument)
            });

            userRepository.findByEmail(email);

            expect(repositoryBase.findOneBy.callCount).toBe(1);
            expect(repositoryBase.findOneBy.getCall(0).args[0]).toEqual({email: email});
        });

        it('should return with a Promise<UserModel> if no error occures', (done) => {
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.findOneBy
                .withArgs({email: email})
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
            let userRepository = new UserRepository(repositoryBase, () => null);
            repositoryBase.findOneBy.returns(new Promise((resolve, reject) => {
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
