import { receiveHosts, RECEIVE_HOSTS } from './hostsActions';
import { HostModel } from '../HostModel';
import { List } from 'immutable';

describe('hostsActions', () => {
    describe('receiveHosts', () => {
        it('should return receive hosts info', () => {
            let hosts = List<HostModel>([
                new HostModel('User1', 27),
                new HostModel('User2', 28)                
            ])

            let action = receiveHosts(hosts);

            expect(action.type).toEqual(RECEIVE_HOSTS);
            expect(action.hosts).toEqual(hosts);
        });
    });
});