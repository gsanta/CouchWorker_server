import { mount, shallow } from 'enzyme';
import { UserModel } from '../../../domain/user/UserModel';
import { Profile } from './Profile';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ProfileStringInput } from './ProfileStringInput';

describe('<Profile/>', () => {
    describe('if the valid state of \'Profile\' changes', () => {
        it('should change the \'Update profile\' button\'s enable state accordingly', () => {
            let user = new UserModel({
                firstName: 'New',
                lastName: 'User',
                birthDate: new Date(1980, 11, 28),
                email: 'new_user@gmail.com',
                profession: 'Drummer',
                country: 'Hungary',
                city: 'Budapest',
                id: null
            });

            const wrapper = shallow(
                <Profile
                    user={user}
                    onSubmit={() => null}
                />
            );

            expect(wrapper.find(Button).prop('disabled')).toBeFalsy();

            wrapper.find(ProfileStringInput).first().simulate('change', { target: { value: '' }});

            expect(wrapper.find(Button).prop('disabled')).toBeTruthy();

            wrapper.find(ProfileStringInput).first().simulate('change', { target: { value: 'abcd' }});

            expect(wrapper.find(Button).prop('disabled')).toBeFalsy();                  
        });  
    })
});