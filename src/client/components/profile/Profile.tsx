import * as React from 'react';
import { UserModel } from '../../../shared/model/user/UserModel';
import { Panel } from 'react-bootstrap';
import * as moment from 'moment';
import { AboutInfoEditor } from './edit_profile/AboutInfoEditor';
import { AboutHeader } from './view_profile/AboutHeader';
import { AddressHeader } from './view_profile/AddressHeader';
import { AddressEditor } from './edit_profile/AddressEditor';
import { AddressModel } from '../../../shared/model/AddressModel';
require('./Profile.scss');

function getAge(birthDate: Date) {
    if (!birthDate) {
        return null;
    }
    return moment().diff(birthDate, 'years');
}

export function Profile(props: ProfileProps) {
    const {user = new UserModel()} = props;
    const birthDate = user.birthDate ? user.birthDate.toString() : null;

    const header = <AboutHeader editAboutInfo={() => props.onEditModeChange('aboutInfo')}/>;
    const addresses = user.addresses.map(address => {
        const editedComponent = `address-${address.uuid}`;
        const addressHeader = (
            <AddressHeader
                edit={() => props.onEditModeChange(editedComponent)}
                delete={() => props.onDeleteAddress(address, props.user.userName)}
            />
        );

        const images = address.images.map(img => {
            return <img src={`public/img/${props.user.uuid}/${address.uuid}/${img.fileName}.${img.extension}`}/>
        });

        return (
            <Panel header={addressHeader}>
                <div>
                    <div>{address.country}</div>
                    <div>{address.city}</div>
                    <div>{address.street}</div>
                    <div>{address.house}</div>
                    {images}
                </div>
            </Panel>
        );
    }).toArray();

    const addressEditors = user.addresses.map(address => {
        const editedComponent = `address-${address.uuid}`;
        return (
            <AddressEditor
                address={address}
                isOpen={props.editedComponent === editedComponent}
                onSubmit={(newAddress) => props.onSubmitAddress(newAddress, props.user.userName)}
                close={() => props.onEditModeChange(null)}
            />
        );
    }).toArray();
    return (
        <div className="cw-profile">
            <Panel header={header}
            >
                <div>{user.firstName} {user.lastName} ({getAge(user.birthDate)})</div>
                <div>{user.profession}</div>
                <div>{user.email}</div>
                <div>{user.country}</div>
                <div>{user.city}</div>
            </Panel>
            {addresses}
            <AboutInfoEditor
                user={props.user}
                isOpen={props.editedComponent === 'aboutInfo'}
                onSubmit={props.onSubmitAboutInfo}
                close={() => props.onEditModeChange(null)}
            />
            {addressEditors}
            <div
                className="cw-add-address"
                onClick={() => props.onEditModeChange('address-new')}
            >
                Add address
            </div>
            <AddressEditor
                address={new AddressModel()}
                isOpen={props.editedComponent === `address-new`}
                onSubmit={(newAddress: AddressModel, files: File[]) => props.onAddAddress(newAddress, files, props.user.userName)}
                close={() => props.onEditModeChange(null)}
            />
        </div>
    );
}

export interface ProfileProps {
    user: UserModel;
    editedComponent: string;
    onSubmit: (user: UserModel) => void;
    onSubmitAboutInfo: (user: UserModel) => void;
    onSubmitAddress: (address: AddressModel, userName: string) => void;
    onDeleteAddress: (address: AddressModel, userName: string) => void;
    onAddAddress: (address: AddressModel, files: File[], userName: string) => void;
    onEditModeChange: (editedComponent: string) => void;
}
