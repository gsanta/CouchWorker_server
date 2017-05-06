import { List } from 'immutable';
import { hosts } from './hostsReducers';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { UserModel, fromUserJson } from '../../shared/model/user/UserModel';
const usersJson = require('../../../../test/mocks/users.json');

describe('hostsReducers', () => {
    describe('hosts', () => {
        it('should return the provided state if no action type applies', () => {
            let action = {
                type: 'unknown'
            };

            let state = List<UserModel>([fromUserJson(usersJson[0])]);

            let newState = hosts(state, action);

            expect(newState).toBe(state);
        });

        it('should use the hosts from the action when the action type is RECEIVE_HOSTS', () => {
            let action = {
                type: FETCH_HOSTS,
                state: ASYNC_STATES.SUCCESS,
                hosts: List<UserModel>([UserModel.fromJson(usersJson[0]), UserModel.fromJson(usersJson[1])])
            };

            let state = List<UserModel>([UserModel.fromJson(usersJson[2])]);

            let newState = hosts(state, action);

            expect(newState).toBe(action.hosts);
        });
    });
});