import { ASYNC_STATES } from '../utils/AsyncStates';
import { receiveHosts, FETCH_HOSTS } from './hostsActions';
import { List } from 'immutable';
import { UserModel, fromUserJson } from '../../shared/model/user/UserModel';
import { AddressModel } from '../../shared/model/AddressModel';
import { RatingModel } from '../../shared/model/RatingModel';
import { ModelState } from '../../shared/model/ModelState';

describe('hostsActions', () => {
    describe('receiveHosts', () => {
        it('should return receive hosts info', () => {
            let hosts = List<UserModel>([
                fromUserJson(
                    {
                        firstName: 'Santa Gergely',
                        lastName: null,
                        userName: null,
                        birthDate: null,
                        registrationDate: null,
                        profession: null,
                        city: null,
                        country: null,
                        languages: [],
                        email: null,
                        rating: 5,
                        uuid: null,
                        addresses: [
                            {
                                country: 'Hungary',
                                city: 'Budapest',
                                uuid: null,
                                images: [],
                                state: ModelState.ACTIVE
                            }
                        ],
                        isActive: true
                    }
                ),
                fromUserJson(
                    {
                        firstName: 'User2',
                        lastName: null,
                        userName: null,
                        birthDate: null,
                        registrationDate: null,
                        profession: null,
                        city: null,
                        country: null,
                        languages: [],
                        email: null,
                        rating: 5,
                        uuid: null,
                        addresses: [
                            {
                                country: 'London',
                                city: 'UK',
                                uuid: null,
                                images: [],
                             state: ModelState.ACTIVE                                
                            },
                        ],
                        isActive: true           
                    }
                ),
                fromUserJson(
                    {
                        firstName: 'User3',
                        lastName: null,
                        userName: null,
                        birthDate: null,
                        registrationDate: null,
                        profession: null,
                        city: null,
                        country: null,
                        languages: [],
                        email: null,
                        rating: 5,
                        uuid: null,
                        addresses: [
                            {
                                country: 'Hungary',
                                city: 'Budapest',
                                uuid: null,
                                images: [],
                                state: ModelState.ACTIVE
                            }
                        ],
                        isActive: true                 
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