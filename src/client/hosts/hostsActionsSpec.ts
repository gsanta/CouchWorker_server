import { ASYNC_STATES } from '../utils/AsyncStates';
import { receiveHosts, FETCH_HOSTS } from './hostsActions';
import { List } from 'immutable';
import { UserModel } from '../../shared/model/user/UserModel';
import { AddressModel } from '../../shared/model/AddressModel';
import { RatingModel } from '../../shared/model/RatingModel';

describe('hostsActions', () => {
    describe('receiveHosts', () => {
        it('should return receive hosts info', () => {
            let hosts = List<UserModel>([
                new UserModel(
                    {
                        firstName: 'Santa Gergely',
                        lastName: null,
                        userName: null,
                        birthDate: null,
                        profession: null,
                        email: null,
                        rating: new RatingModel(5),
                        uuid: null,
                        addresses: [
                            new AddressModel({
                                country: 'Hungary',
                                city: 'Budapest',
                                uuid: null
                            })
                        ]
                    }
                ),
                new UserModel(
                    {
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        userName: null,
                        profession: null,
                        email: null,
                        rating: new RatingModel(3.4),
                        uuid: null,
                        addresses: [
                            new AddressModel({
                                country: 'London',
                                city: 'UK',
                                uuid: null
                            })
                        ]                     
                    }
                ),
                new UserModel(
                    {
                        firstName: 'User3',
                        lastName: null,
                        birthDate: null,
                        userName: null,
                        profession: null,
                        email: null,
                        rating: new RatingModel(4.2),
                        uuid: null,
                        addresses: [
                            new AddressModel({
                                country: 'Hungary',
                                city: 'Budapest',
                                uuid: null
                            })
                        ]                     
                    }
                )         
            ]);

            let action = receiveHosts(hosts);

            expect(action.type).toEqual(FETCH_HOSTS);
            expect(action.state).toEqual(ASYNC_STATES.SUCCESS);
            expect(action.hosts).toEqual(hosts);
        });
    });
});