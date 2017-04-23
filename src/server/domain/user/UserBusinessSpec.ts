import {UserBusiness} from "./UserBusiness";
import * as sinon from 'sinon';

describe('UserBusiness', () => {
    describe('create', () => {
        it('should call the create of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                create: sinon.spy()
            };

            let item: any = sinon.spy();
            let callback: any = sinon.spy();

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.create(item);
            expect(userRepository.create.callCount).toBe(1);
            expect(userRepository.create.calledWith(item)).toBe(true);
        });
    });

    describe('delete', () => {
        it('should call the delete of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                delete: sinon.spy()
            };

            let item: any = sinon.spy();
            let callback: any = sinon.spy();

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.delete(item);
            expect(userRepository.delete.callCount).toBe(1);
            expect(userRepository.delete.calledWith(item)).toBe(true);
        });
    });

    describe('update', () => {
        it('should call the update of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                update: sinon.spy()
            };

            let item: any = sinon.spy();
            let userBusiness = new UserBusiness(userRepository);

            userBusiness.update(item);
            expect(userRepository.update.callCount).toBe(1);
            expect(userRepository.update.calledWith(item)).toBe(true);
        });
    });

    describe('findAll', () => {
        it('should call the findAll of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                findAll: sinon.spy()
            };

            let pagination: any = sinon.spy();

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.findAll(pagination);
            expect(userRepository.findAll.callCount).toBe(1);
            expect(userRepository.findAll.calledWith(pagination)).toBe(true);
        });
    });

    describe('findBy', () => {
        it('should call the findBy of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                findBy: sinon.spy()
            };
            let item: any = sinon.spy();
            let pagination: any = sinon.spy();            

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.findBy(item, pagination);
            expect(userRepository.findBy.callCount).toBe(1);
            expect(userRepository.findBy.calledWith(item, pagination)).toBe(true);
        });
    });

    describe('findByEmail', () => {
        it('should call the findByEmail of the supplied UserRepository with the correct values', () => {
            let userRepository: any = {
                findByEmail: sinon.spy()
            };

            let email: any = sinon.spy();

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.findByEmail(email);
            expect(userRepository.findByEmail.callCount).toBe(1);
            expect(userRepository.findByEmail.calledWith(email)).toBe(true);
        });
    });
});
