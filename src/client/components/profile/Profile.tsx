
import * as React from 'react';
import { UserModel } from '../../../domain/user/UserModel';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { ProfileBirthDate } from './ProfileBirthDate';
import { ProfileStringInput } from './ProfileStringInput';

export function Profile(props: RegistrationProps) {
    return (
        <form>
            <ProfileStringInput 
                value={props.user.getPersonalInfo().getFirstName()}
                onChange={(value: string) => null}
                validationState='success'
                controlId='cw-form-profile-name'
                placeHolder='Enter text'
                controlLabel='Working example with validation'
                helpBlock='Validation is based on string length.'
            />
            <ProfileStringInput
                value={props.user.getPersonalInfo().getLastName()}
                onChange={(value: string) => null}
                validationState='success'
                controlId='cw-form-profile-name'
                placeHolder='Enter text'
                controlLabel='Working example with validation'
                helpBlock='Validation is based on string length.'
            />
            <ProfileBirthDate date={props.user.getPersonalInfo().getBirthDate()}/>
        </form>
    );
}

export interface RegistrationProps {
    user: UserModel;
}