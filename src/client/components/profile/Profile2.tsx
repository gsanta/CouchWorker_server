import * as React from 'react';
import { UserModel } from '../../../shared/model/user/UserModel';
import { Panel } from 'react-bootstrap';
import * as moment from 'moment';

function getAge(birthDate: Date) {
    if (!birthDate) {
        return null;
    }
    return moment().diff(birthDate, 'years');
}

export function Profile(props: ProfileProps) {

    const {user = new UserModel()} = props;
    const birthDate = user.getBirthDate() ? user.getBirthDate().toString() : null;
    return (
        <div>
            <Panel header={'About'}>
                <div>{user.getFirstName()} {user.getLastName()} ({getAge(user.getBirthDate())})</div>
                <div>{user.getProfession()}</div>
            </Panel>
        </div>
    );
}

export interface ProfileProps {
    user: UserModel;
    onSubmit: (user: UserModel) => void;
}