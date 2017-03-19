import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { hosts } from './hostsReducers';
import { RECEIVE_HOSTS } from './hostsActions';
import { PersonalInfoModel } from '../../domain/user/PersonalInfoModel';


describe('hostsReducers', () => {
    describe('hosts', () => {
        it('should return the provided state if no action type applies', () => {
            let action = {
                type: 'unknown'
            };

            let state = List<HostModel>([
                    new HostModel(new PersonalInfoModel('User1', null, null, null), null, null),
                    new HostModel(new PersonalInfoModel('User2', null, null, null), null, null),
                ]);

            let newState = hosts(state, action);

            expect(newState).toBe(state);
        });

        it('should use the hosts from the action when the action type is RECEIVE_HOSTS', () => {
            let action = {
                type: RECEIVE_HOSTS,
                hosts: List<HostModel>([
                    new HostModel(new PersonalInfoModel('User1', null, null, null), null, null),
                    new HostModel(new PersonalInfoModel('User2', null, null, null), null, null),
                ])
            };

            let state = List<HostModel>([
                new HostModel(new PersonalInfoModel('User3', null, null, null), null, null)
            ]);

            let newState = hosts(state, action);

            expect(newState).toBe(action.hosts);
        });
    });
});