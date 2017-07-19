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
import * as Lightbox from 'react-images';
import { AddressPanel } from './address/AddressPanel';
import { ImageGallery } from './ImageGallery';
require('./Profile.scss');

function getAge(birthDate: Date) {
    if (!birthDate) {
        return null;
    }
    return moment().diff(birthDate, 'years');
}

export class Profile extends React.Component<ProfileProps, ProfileState> {

    constructor(props: ProfileProps) {
        super();
        this.state = {
            activeGallery: null
        };
    }


    private createImageGallery() {
        const images = this.state.activeGallery ? this.state.activeGallery.map(image => ({ src: image.src})) : [];
        return (
            <ImageGallery images={images} />
        );
    }

    private createAddresses() {
        return this.props.user.addresses.map(address => {
            const addressHeader = (
                <AddressHeader
                    edit={() => this.props.onEditModeChange({componentType: 'Address', model: address})}
                    delete={() => this.props.onDeleteAddress(address, this.props.user.userName)}
                />
            );

            return (
                <AddressPanel
                    header={
                        <AddressHeader
                            edit={() => this.props.onEditModeChange({componentType: 'Address', model: address})}
                            delete={() => this.props.onDeleteAddress(address, this.props.user.userName)}
                        />
                    }
                    address={address}
                    userId={this.props.user.uuid}
                    onClick={this.onGalleryOpen.bind(this)}
                />
            );
        });
    }

    private createAddressEditor() {
        let address = null;

        if (this.props.editedComponent && this.props.editedComponent.componentType === 'Address') {
            address = this.props.editedComponent.model;
        }

        return (<AddressEditor
                user={this.props.user}
                address={address}
                isOpen={this.props.editedComponent && this.props.editedComponent.componentType === 'Address'}
                onSubmit={(newAddress: AddressModel, newImages: ImageSrc[], deletedImages: ImageSrc[]) => {
                    if (!newAddress.uuid) {
                        this.props.onAddAddress(newAddress, newImages, this.props.user.userName);
                    } else {
                        this.props.onUpdateddress(newAddress, newImages, deletedImages, this.props.user.userName);
                    }
                }}
                close={() => this.props.onEditModeChange(null)}
            />
        );
    }

    public render() {
        const {user = new UserModel()} = this.props;
        const birthDate = user.birthDate ? user.birthDate.toString() : null;

        const header = <AboutHeader editAboutInfo={() => this.props.onEditModeChange({componentType: 'User', model: this.props.user})}/>;

        const addresses = this.createAddresses().map(address => (
            <Col md={5} mdOffset={0} sm={10} smOffset={1}>
                {address}
            </Col>
        ));

        return (
            <div className="cw-profile">
                <Row>
                    <Col md={10} mdOffset={1} className="cw-add-address-col">
                        <div
                            className="cw-button cw-save-button"
                            onClick={() => this.props.onEditModeChange({componentType: 'Address', model: new AddressModel()})}
                        >
                            Add address
                        </div>
                    </Col>
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
                </Row>
                <AboutInfoEditor
                    user={this.props.user}
                    isOpen={this.props.editedComponent && this.props.editedComponent.componentType === 'User'}
                    onSubmit={this.props.onSubmitAboutInfo}
                    close={() => this.props.onEditModeChange(null)}
                />
                {this.createAddressEditor()}
                {this.createImageGallery()}
            </div>
        );
    }

    private onGalleryOpen(address: AddressModel) {
        this.setState({
            activeGallery: address.images
        });
    }
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

export interface ProfileState {
    activeGallery: UrlModel[];
}
