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

function getInitialState(props: AddressEditorProps) {
    return {
        address: props.address,
        deletedImages: [],
        files: [],
        errors: null,
        isCountryModified: false,
        isCityModified: false,
        isStreetModified: false,
        isHouseModified: false
    };
}

export class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);

        this.state = getInitialState(props);
    }

    componentWillReceiveProps(newProps: AddressEditorProps) {
        if (!this.props.isOpen && newProps.isOpen) {
            this.setState(getInitialState(newProps));
        } else {
            this.setState({
                address: newProps.address || new AddressModel()
            });
        }
    }

    public render() {
        const errors = this.state.errors || {};

        return (
            <Modal show={this.props.isOpen} onHide={this.props.close} className="cw-address-new">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Basic info">
                            <StringInput
                                value={this.state.address.country}
                                onChange={this.onCountryChange.bind(this)}
                                controlId="cw-form-address-country"
                                placeHolder="Enter country"
                                controlLabel="Country"
                                name="country"
                                error={this.state.isCountryModified && errors.country}
                            />
                            <StringInput
                                value={this.state.address.city}
                                onChange={this.onCityChange.bind(this)}
                                controlId="cw-form-address-city"
                                placeHolder="Enter city"
                                controlLabel="City"
                                name="city"
                                error={this.state.isCityModified && errors.city}
                            />
                            <StringInput
                                value={this.state.address.street}
                                onChange={this.onStreetChange.bind(this)}
                                controlId="cw-form-address-street"
                                placeHolder="Enter street"
                                controlLabel="Street"
                                name="street"
                                error={this.state.isStreetModified && errors.street}
                            />
                            <StringInput
                                value={this.state.address.house}
                                onChange={this.onHouseChange.bind(this)}
                                controlId="cw-form-address-house"
                                placeHolder="Enter house"
                                controlLabel="House"
                                name="house"
                                error={this.state.isHouseModified && errors.house}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Images">
                            <Dropzone onDrop={this.onDrop.bind(this)}>
                                <p>Try dropping some files here, or click to select files to upload.</p>
                            </Dropzone>
                            {this.renderUploadedImages()}
                            {this.renderPreviewImages()}
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button
                        disabled={this.state.errors}
                        onClick={() => this.props.onSubmit(this.state.address, this.state.files, this.state.deletedImages)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private onAddressChange(address: AddressModel) {
        const errors = this.validate(address);

        this.setState({
            address,
            errors
        });
    }

    private onAddImages(images: ImageSrc[]) {
        this.setState({
            images: {...this.state.images, ...images}
        });
    }

    private onDeleteImage(image: ImageSrc) {
        let removableRemoteImages = this.state.removableRemoteImages;
        if ((image as any).fileName) {
            removableRemoteImages = {...removableRemoteImages, image};
        }

        this.setState({
            removableRemoteImages: removableRemoteImages,
            images: this.state.images.filter(img => img !== image);
        });
    }

    private validate(model: AddressModel) {
        return (validate as any).validate(model, addressValidator);
    }
}

export interface AddressEditorProps {
    user: UserModel;
    address: AddressModel;
    isOpen: boolean;
    close: () => void;
    onSubmit: (address: AddressModel, newImages: File[], deletedImages: UrlModel[]) => void;
}

export interface AddressEditorState {
    address: AddressModel;
    images: ImageSrc[];
    removableRemoteImages: UrlModel[];
    errors: any;
}
