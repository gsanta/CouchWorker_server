import * as React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { FormControl, HelpBlock } from 'react-bootstrap';
import { StringInput } from './StringInput';

describe('<ProfileStringInput/>', () => {
    describe('if no error is present', () => {
        it('should render with the default styling', () => {
            const wrapper = mount(
                <StringInput
                    value={'Santa'}
                    onChange={(event: React.ChangeEvent<any>) => null}
                    controlId='cw-form-profile-name'
                    placeHolder='Enter text'
                    controlLabel='Working example with validation'
                    error={null}
                />
            );
            // hasClass only worked when mounting the element
            expect(wrapper.hasClass('has-error')).toBeFalsy();
            expect(wrapper.find(FormControl).length).toBe(1);
            expect(wrapper.find(HelpBlock).length).toBe(0);            
        });
    });
    

    describe('if error is provided', () => {
        it('should display the error message', () => {
            console.log(window.document);
            const wrapper = mount(
                <StringInput
                    value={'Santa'}
                    onChange={(event: React.ChangeEvent<any>) => null}
                    controlId='cw-form-profile-name'
                    placeHolder='Enter text'
                    controlLabel='Working example with validation'
                    error={'The field is required'}
                />
            );
            // hasClass only worked when mounting the element
            expect(wrapper.hasClass('has-error')).toBeTruthy();
            expect(wrapper.find(HelpBlock).length).toBe(1);
            expect(wrapper.find(HelpBlock).text()).toBe('The field is required');
        });
    });
});