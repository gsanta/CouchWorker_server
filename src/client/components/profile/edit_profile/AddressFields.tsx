import * as React from 'react';
import { AddressModel } from '../../../../shared/model/AddressModel';
import { Modal, Button } from 'react-bootstrap';
import { StringInput } from '../../form/StringInput';
import * as validate from 'validate.js';
import { addressValidator } from '../../../../shared/model/addressValidator';
import * as Dropzone from 'react-dropzone';
import {Tab, Tabs, Thumbnail} from 'react-bootstrap';
import { UrlModel } from '../../../../shared/model/UrlModel';
import { UserModel } from '../../../../shared/model/user/UserModel';
import { ImageSrc } from '../../../../shared/model/ImageSrc';

export class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);

        this.state = {
            isCountryModified: false,
            isCityModified: false,
            isStreetModified: false,
            isHouseModified: false
        };
    }

    public render() {
        const errors = this.props.errors || {};
        const address = this.props.address;
        return (
            <div>
                <StringInput
                    value={address.country}
                    onChange={this.onCountryChange.bind(this)}
                    controlId="cw-form-address-country"
                    placeHolder="Enter country"
                    controlLabel="Country"
                    name="country"
                    error={this.state.isCountryModified && errors.country}
                />
                <StringInput
                    value={address.city}
                    onChange={this.onCityChange.bind(this)}
                    controlId="cw-form-address-city"
                    placeHolder="Enter city"
                    controlLabel="City"
                    name="city"
                    error={this.state.isCityModified && errors.city}
                />
                <StringInput
                    value={address.street}
                    onChange={this.onStreetChange.bind(this)}
                    controlId="cw-form-address-street"
                    placeHolder="Enter street"
                    controlLabel="Street"
                    name="street"
                    error={this.state.isStreetModified && errors.street}
                />
                <StringInput
                    value={address.house}
                    onChange={this.onHouseChange.bind(this)}
                    controlId="cw-form-address-house"
                    placeHolder="Enter house"
                    controlLabel="House"
                    name="house"
                    error={this.state.isHouseModified && errors.house}
                />
            </div>
        );
    }

    private renderImages(images: ImageSrc[]) {
        return images.map(image => {
            return (
                <Thumbnail src={image.src}>
                    <Button bsStyle="danger" onClick={() => this.props.onDeleteImage(image)}>Delete</Button>
                </Thumbnail>
            );
        });
    }

    private onDrop(files: File[]) {
        const images = files.map(file => ({file: file, src: (file as any).preview}));
        this.props.onAddImages(images);
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        const address = {...this.props.address, country: event.target.value};
        this.props.onAddressChange(address);
        this.setState({
            isCountryModified: true
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const address = {...this.props.address, city: event.target.value};
        this.props.onAddressChange(address);
        this.setState({
            isCityModified: true
        });
    }

    private onStreetChange(event: React.ChangeEvent<any>) {
        const address = {...this.props.address, street: event.target.value};
        this.props.onAddressChange(address);
        this.setState({
            isStreetModified: true
        });
    }

    private onHouseChange(event: React.ChangeEvent<any>) {
        const address = {...this.props.address, house: event.target.value};
        this.props.onAddressChange(address);
        this.setState({
            isHouseModified: true
        });
    }
}

export interface AddressEditorProps {
    onAddressChange: (address: AddressModel) => void;
    onAddImages(images: ImageSrc[]): void;
    onDeleteImage(image: ImageSrc): void;
    address: AddressModel;
    images: ImageSrc[];
    errors: any;
}

export interface AddressEditorState {
    isCountryModified: boolean;
    isCityModified: boolean;
    isStreetModified: boolean;
    isHouseModified: boolean;
}
