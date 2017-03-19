import * as React from 'react';
import { shallow } from 'enzyme';
import { ProfileName } from './ProfileName';
import { FormControl } from 'react-bootstrap';

describe('<ProfileName/>', () => {
    it('renders the name', () => {
        const wrapper = shallow(<ProfileName name='abcd'/>);
        expect(wrapper.find(FormControl).length).toBe(1);
    });
});