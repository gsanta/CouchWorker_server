import { HostModel } from '../HostModel';
import { List } from 'immutable';
import { hosts } from './hostsReducers';
import { RECEIVE_HOSTS } from './hostsActions';


describe('hostsReducers', () => {
    describe('hosts', () => {
        it('should return the provided state if no action type applies', () => {
            let action = {
                type: 'unknown'
            };

            let state = List<HostModel>([
                    new HostModel('User1', 27),
                    new HostModel('User2', 28),
                ]);

            let newState = hosts(state, action);

            expect(newState).toBe(state);
        });

        it('should use the hosts from the action when the action type is RECEIVE_HOSTS', () => {
            let action = {
                type: RECEIVE_HOSTS,
                hosts: List<HostModel>([
                    new HostModel('User1', 27),
                    new HostModel('User2', 28),
                ])
            };

            let state = List<HostModel>([
                new HostModel('User3', 29)
            ]);

            let newState = hosts(state, action);

            expect(newState).toBe(action.hosts);
        });
    });
});