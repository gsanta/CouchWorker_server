import * as React from 'react';
import { UserModel } from '../../../shared/model/user/UserModel';
import { Panel, Row, Col } from 'react-bootstrap';
import * as moment from 'moment';
import { AboutInfoEditor } from './edit_profile/AboutInfoEditor';
import { AboutHeader } from './view_profile/AboutHeader';
import { AddressHeader } from './view_profile/AddressHeader';
import { AddressEditor } from './edit_profile/AddressEditor';
import { AddressModel } from '../../../shared/model/AddressModel';
import { UrlModel } from '../../../shared/model/UrlModel';
import { ImageSrc } from '../../../shared/model/ImageSrc';
import { EditedComponent } from '../../utils/EditedComponent';
require('./Profile.scss');

function getAge(birthDate: Date) {
    if (!birthDate) {
        return null;
    }
    return moment().diff(birthDate, 'years');
}

export function Profile(props: ProfileProps) {
    function createAddresses() {
        return user.addresses.map(address => {
            const addressHeader = (
                <AddressHeader
                    edit={() => props.onEditModeChange({componentType: 'Address', model: address})}
                    delete={() => props.onDeleteAddress(address, props.user.userName)}
                />
            );

            const images = address.images.map(img => {
                return (
                    <img
                        className="cw-thumbnail"
                        key={img.fileName}
                        src={`img/${props.user.uuid}/addresses/${address.uuid}/${img.fileName}.${img.extension}`}
                    />
                );
            });

            let streetHouse = address.street;

            if (address.house) {
                streetHouse += `,${address.house}`;
            }

            return (
                <Panel className="cw-panel" header={addressHeader} key={address.uuid}>
                    <div>
                        <div className="cw-text-primary">{address.country}, {address.city}</div>
                        <div>{streetHouse}</div>
                        <div className="cw-thumbnail-grid">
                            {images}
                        </div>
                    </div>
                </Panel>
            );
        });
    }

    function createAddressEditor() {
        let address = null;

        if (props.editedComponent && props.editedComponent.componentType === 'Address') {
            address = props.editedComponent.model;
        }

        return (<AddressEditor
                user={props.user}
                address={address}
                isOpen={props.editedComponent && props.editedComponent.componentType === 'Address'}
                onSubmit={(newAddress: AddressModel, newImages: ImageSrc[], deletedImages: ImageSrc[]) => {
                    if (!newAddress.uuid) {
                        props.onAddAddress(newAddress, newImages, props.user.userName);
                    } else {
                        props.onUpdateddress(newAddress, newImages, deletedImages, props.user.userName);
                    }
                }}
                close={() => props.onEditModeChange(null)}
            />
        );
    }

    const {user = new UserModel()} = props;
    const birthDate = user.birthDate ? user.birthDate.toString() : null;

    const header = <AboutHeader editAboutInfo={() => props.onEditModeChange({componentType: 'User', model: props.user})}/>;

    const addresses = createAddresses().map(address => (
        <Col md={5} mdOffset={0} sm={10} smOffset={1}>
            {address}
        </Col>
    ));

    return (
        <div className="cw-profile">
            <Row>
                <Col md={5} mdOffset={1} sm={10} smOffset={1}>
                    <Panel
                        header={header}
                        key={user.uuid}
                        className="cw-about-info cw-panel"
                    >
                        <div>{user.firstName} {user.lastName} ({getAge(user.birthDate)})</div>
                        <div>{user.profession}</div>
                        <div>{user.email}</div>
                        <div>{user.country}</div>
                        <div>{user.city}</div>
                    </Panel>
                </Col>
                {addresses}

                <Col md={10} mdOffset={1}>
                    <div
                        className="cw-add-address cw-action-link"
                        onClick={() => props.onEditModeChange({componentType: 'Address', model: new AddressModel()})}
                    >
                        Add address
                    </div>
                </Col>
            </Row>
            <AboutInfoEditor
                user={props.user}
                isOpen={props.editedComponent && props.editedComponent.componentType === 'User'}
                onSubmit={props.onSubmitAboutInfo}
                close={() => props.onEditModeChange(null)}
            />
            {createAddressEditor()}
        </div>
    );
}

export interface ProfileProps {
    user: UserModel;
    editedComponent: EditedComponent;
    onSubmit: (user: UserModel) => void;
    onSubmitAboutInfo: (user: UserModel) => void;
    onUpdateddress: (address: AddressModel, newImages: ImageSrc[], deletedImages: ImageSrc[], userName: string) => void;
    onDeleteAddress: (address: AddressModel, userName: string) => void;
    onAddAddress: (address: AddressModel, newImages: ImageSrc[], userName: string) => void;
    onEditModeChange: (editedComponent: EditedComponent) => void;
}
