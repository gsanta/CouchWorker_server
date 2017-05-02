import * as React from 'react';
import { UserModel } from '../../../shared/model/user/UserModel';
import { Panel } from 'react-bootstrap';
import * as moment from 'moment';
import { AboutInfoEditor } from './edit_profile/AboutInfoEditor';
import { AboutHeader } from './view_profile/AboutHeader';
import { AddressHeader } from './view_profile/AddressHeader';
import { AddressEditor } from './edit_profile/AddressEditor';
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

    const header = <AboutHeader editAboutInfo={() => props.onEditModeChange('aboutInfo')}/>;
    const addresses = user.getAddresses().map(address => {
        const editedComponent = `address-${address.getUuid()}`;
        const addressHeader = <AddressHeader editAddress={() => props.onEditModeChange(editedComponent)}/>;
        return (
            <Panel header={addressHeader}>
                <div>
                    <div>{address.getCountry()}</div>
                    <div>{address.getCity()}</div>
                    <div>{address.getStreet()}</div>
                    <div>{address.getHouse()}</div>
                </div>
            </Panel>
        )
    }).toArray();

    const addressEditors = user.getAddresses().map(address => {
        const editedComponent = `address-${address.getUuid()}`
        return (
            <AddressEditor
                address={address}
                isOpen={props.editedComponent === editedComponent}
                onSubmit={null}
                close={() => props.onEditModeChange(null)}
            />
        )
    }).toArray();
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
            {addresses}
            <AboutInfoEditor 
                user={props.user}
                isOpen={props.editedComponent === 'aboutInfo'}
                onSubmit={props.onSubmitAboutInfo}
                close={() => props.onEditModeChange(null)}
            />
            {addressEditors}
        </div>
    );
}

export interface ProfileProps {
    user: UserModel;
    editedComponent: string;
    onSubmit: (user: UserModel) => void;
    onSubmitAboutInfo: (user: UserModel) => void;
    onEditModeChange: (editedComponent: string) => void;
}