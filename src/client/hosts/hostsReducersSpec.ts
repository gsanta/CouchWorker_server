import { List } from 'immutable';
import { hosts } from './hostsReducers';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { UserModel } from '../../shared/model/user/UserModel';


describe('hostsReducers', () => {
    describe('hosts', () => {
        it('should return the provided state if no action type applies', () => {
            let action = {
                type: 'unknown'
            };

            let state = List<UserModel>([
                    new UserModel({
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        userName: null,
                        profession: null,
                        email: null,
                        rating: null,
                        addresses: [],
                        uuid: null
                    })
                ]);

            let newState = hosts(state, action);

            expect(newState).toBe(state);
        });

        it('should use the hosts from the action when the action type is RECEIVE_HOSTS', () => {
            let action = {
                type: FETCH_HOSTS,
                state: ASYNC_STATES.SUCCESS,
                hosts: List<UserModel>([
                    new UserModel({
                        firstName: 'User1',
                        lastName: null,
                        birthDate: null,
                        userName: null,
                        profession: null,
                        email: null,
                        rating: null,
                        addresses: [],
                        uuid: null
                    }),
                    new UserModel({
                        firstName: 'User2',
                        lastName: null,
                        birthDate: null,
                        userName: null,
                        profession: null,
                        email: null,
                        rating: null,
                        addresses: [],
                        uuid: null                     
                    }),
                ])
            };

            let state = List<UserModel>([
                new UserModel({
                    firstName: 'User3',
                    lastName: null,
                    birthDate: null,
                    userName: null,
                    profession: null,
                    email: null,
                    rating: null,
                    addresses: [],
                    uuid: null                     
                })
            ]);

            let newState = hosts(state, action);

            expect(newState).toBe(action.hosts);
        });
    });
});