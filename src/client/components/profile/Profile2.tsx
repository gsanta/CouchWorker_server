import * as React from 'react';
import { UserModel } from '../../../shared/model/user/UserModel';
import { Panel } from 'react-bootstrap';
import * as moment from 'moment';
import { AboutInfoEditor } from './edit_profile/AboutInfoEditor';
import { AboutHeader } from './view_profile/AboutHeader';
require('./Profile.scss');

function getAge(birthDate: Date) {
    if (!birthDate) {
        return null;
    }
    return moment().diff(birthDate, 'years');
}

export function Profile(props: ProfileProps) {
    const {user = new UserModel()} = props;
    const birthDate = user.getBirthDate() ? user.getBirthDate().toString() : null;

    const header = <AboutHeader editAboutInfo={() => props.onEditModeChange(true)}/>
    return (
        <div className="cw-profile">
            <Panel header={header}
            >
                <div>{user.getFirstName()} {user.getLastName()} ({getAge(user.getBirthDate())})</div>
                <div>{user.getProfession()}</div>
                <div>{user.getEmail()}</div>
                <div>{user.getCountry()}</div>
                <div>{user.getCity()}</div>
            </Panel>
            <AboutInfoEditor 
                user={props.user}
                isOpen={props.isEditing}
                onSubmit={props.onSubmitAboutInfo}
                close={() => props.onEditModeChange(false)}
            />
        </div>
    );
}

export interface ProfileProps {
    user: UserModel;
    isEditing: boolean;
    onSubmit: (user: UserModel) => void;
    onSubmitAboutInfo: (user: UserModel) => void;
    onEditModeChange: (isEditing: boolean) => void;
}