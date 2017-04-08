import { shallow, mount } from 'enzyme';
import { Login } from './Login';
import * as React from 'react';
import { StringInput } from '../form/StringInput';
import { Button } from 'react-bootstrap';

describe('Login', () => {
    describe('When initially loading', () => {
        it('should render with the default styling', () => {
            const login = shallow(
                <Login
                    onSubmit={val => null}
                />
            );

            expect(login.find(StringInput).length).toBe(2);
            expect(login.find(Button).length).toBe(2);
        });
    });

    /*describe('When typing an invalid value to the Email input', () => {
        it('should go into an error state', () => {
            const login = mount(
                <Login
                    onSubmit={val => null}
                />
            );


            login.find(StringInput).first().simulate('change', { target: { value: 'a' }});
            expect(login.find(Button).first().prop('disabled')).toBeTruthy();

            console.log('error length', login.find('.has-error').length)
            
        });
    });*/
});