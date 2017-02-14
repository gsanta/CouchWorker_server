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

            let id: any = sinon.spy();
            let callback: any = sinon.spy();

            let userBusiness = new UserBusiness(userRepository);

            userBusiness.delete(id, callback);
            expect(userRepository.delete.callCount).toBe(1);
            expect(userRepository.delete.calledWith(id, callback)).toBe(true);
        });
    });
});
