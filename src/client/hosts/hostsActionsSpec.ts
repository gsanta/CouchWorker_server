import { ASYNC_STATES } from '../utils/AsyncStates';
import { receiveHosts, FETCH_HOSTS } from './hostsActions';
import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { AddressModel } from '../../domain/user/AddressModel';
import { RatingModel } from '../../domain/user/RatingModel';
import { PersonalInfoModel } from '../../domain/user/PersonalInfoModel';

describe('hostsActions', () => {
    describe('receiveHosts', () => {
        it('should return receive hosts info', () => {
            let hosts = List<HostModel>([
                new HostModel(
                    {
                        firstName: 'Santa Gergely',
                        lastName: null,
                        birthDate: null,
                        email: null,
                        country: 'Hungary',
                        city: 'Budapest',
                        rating: 5 
                    }
                ),
                new HostModel(
                    {
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        email: null,
                        country: 'London',
                        city: 'UK',
                        rating: 3.4 
                    }
                ),
                new HostModel(
                    {
                        firstName: 'User3',
                        lastName: null,
                        birthDate: null,
                        email: null,
                        country: 'Hungary',
                        city: 'Budapest',
                        rating: 4.2 
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