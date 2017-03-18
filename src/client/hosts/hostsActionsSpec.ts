import { receiveHosts, RECEIVE_HOSTS } from './hostsActions';
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
                    new PersonalInfoModel('Santa Gergely', null, null),
                    new AddressModel({
                        country: 'Hungary',
                        city: 'Budapest'
                    }),
                    new RatingModel(5)
                ),
                new HostModel(
                    new PersonalInfoModel('User2', null, null),
                    new AddressModel({
                        country: 'London',
                        city: 'UK'
                    }),
                    new RatingModel(3.4)
                ),
                new HostModel(
                    new PersonalInfoModel('User2', null, null),
                    new AddressModel({
                        country: 'Hungary',
                        city: 'Budapest'
                    }),
                    new RatingModel(4.2)
                )         
            ])

            let action = receiveHosts(hosts);

            expect(action.type).toEqual(RECEIVE_HOSTS);
            expect(action.hosts).toEqual(hosts);
        });
    });
});