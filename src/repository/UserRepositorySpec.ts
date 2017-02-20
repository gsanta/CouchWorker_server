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
            create: sinon.stub()
        };

        repositoryBase.create.withArgs(userModel).returns({
            then: (callback: any) => callback(userDocument)
        })
    });


    describe('create', () => {
        fit('should call the create method of RepositoryBase with the correct parameters', () => {
            let userRepository = new UserRepository(repositoryBase);

            userRepository.create(userModel);

            expect(repositoryBase.callCount).toBe(1);
            expect(repositoryBase.create.getCall(0).args[0]).toEqual(userDocument);
        });
    });
});
