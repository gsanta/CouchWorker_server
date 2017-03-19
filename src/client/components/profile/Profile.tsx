
import * as React from 'react';
import { UserModel } from '../../../domain/user/UserModel';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { ProfileName } from './ProfileName';
import { ProfileBirthDate } from './ProfileBirthDate';

export function Profile(props: RegistrationProps) {
    return (
        <form>
            <ProfileName name={props.user.getPersonalInfo().getFirstName()}/>
            <ProfileName name={props.user.getPersonalInfo().getLastName()}/>
            <ProfileBirthDate date={props.user.getPersonalInfo().getBirthDate()}/>
        </form>
    );
}

export interface RegistrationProps {
    user: UserModel;
}