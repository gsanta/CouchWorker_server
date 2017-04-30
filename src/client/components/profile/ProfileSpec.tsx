/*import { mount, shallow } from 'enzyme';
import { Profile } from './Profile';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { StringInput } from '../form/StringInput';
import { UserModel } from '../../../shared/model/user/UserModel';
import { AddressModel } from '../../../shared/model/AddressModel';
import { RatingModel } from '../../../shared/model/RatingModel';

describe('<Profile/>', () => {
    describe('if the valid state of \'Profile\' changes', () => {
        it('should change the \'Update profile\' button\'s enable state accordingly', () => {
            let user = UserModel.fromJson({
                firstName: 'New',
                lastName: 'User',
                userName: 'New.User',
                birthDate: new Date(1980, 11, 28).toJSON(),
                registrationDate: new Date(2000, 11, 28).toJSON(),
                email: 'new_user@gmail.com',
                profession: 'Drummer',
                country: 'Hungary',
                city: 'Budapest',
                languages: ['hungarian'],
                rating: 5,
                uuid: '1234',
                addresses: [{
                    country: 'Hungary',
                    city: 'Budapest',
                    uuid: null,
                    images: []
                }],
                isActive: true
            });

            const wrapper = shallow(
                <Profile
                    user={user}
                    onSubmit={() => null}
                />
            );

            // expect(wrapper.find(Button).first().prop('disabled')).toBeFalsy();

            // wrapper.find(StringInput).first().simulate('change', { target: { value: '' }});

            // expect(wrapper.find(Button).first().prop('disabled')).toBeTruthy();

            // wrapper.find(StringInput).first().simulate('change', { target: { value: 'abcd' }});

            // expect(wrapper.find(Button).first().prop('disabled')).toBeFalsy();                  
        });  
    });
});*/