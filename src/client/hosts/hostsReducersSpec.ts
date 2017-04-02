import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { hosts } from './hostsReducers';
import { PersonalInfoModel } from '../../domain/user/PersonalInfoModel';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';


describe('hostsReducers', () => {
    describe('hosts', () => {
        it('should return the provided state if no action type applies', () => {
            let action = {
                type: 'unknown'
            };

            let state = List<HostModel>([
                    new HostModel({
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        country: null,
                        city: null,
                        email: null,
                        rating: null
                    })
                ]);

            let newState = hosts(state, action);

            expect(newState).toBe(state);
        });

        it('should use the hosts from the action when the action type is RECEIVE_HOSTS', () => {
            let action = {
                type: FETCH_HOSTS,
                state: ASYNC_STATES.SUCCESS,
                hosts: List<HostModel>([
                    new HostModel({
                        firstName: 'User1',
                        lastName: null,
                        birthDate: null,
                        email: null,
                        country: null,
                        city: null,
                        rating: null
                    }),
                    new HostModel({
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        email: null,
                        country: null,
                        city: null,
                        rating: null
                    }),
                ])
            };

            let state = List<HostModel>([
                new HostModel({
                    firstName: 'User3',
                    lastName: null,
                    birthDate: null,
                    email: null,
                    country: null,
                    city: null,
                    rating: null
                })
            ]);

            let newState = hosts(state, action);

            expect(newState).toBe(action.hosts);
        });
    });
});