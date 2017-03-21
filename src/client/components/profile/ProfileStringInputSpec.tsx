import * as React from 'react';
import { shallow } from 'enzyme';
import { ProfileStringInput } from './ProfileStringInput';
import { FormControl } from 'react-bootstrap';

describe('<ProfileName/>', () => {
    it('renders the name', () => {
        const wrapper = shallow(
            <ProfileStringInput
                value={'Santa'}
                onChange={(event: React.ChangeEvent<any>) => null}
                validationState='success'
                controlId='cw-form-profile-name'
                placeHolder='Enter text'
                controlLabel='Working example with validation'
                helpBlock='Validation is based on string length.'
            />
        );
        expect(wrapper.find(FormControl).length).toBe(1);
    });
});