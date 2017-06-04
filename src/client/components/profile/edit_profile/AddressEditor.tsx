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

export class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);

        this.state = {
            address: this.props.address,
            deletedImages: [],
            files: [],
            errors: null,
            isCountryModified: false,
            isCityModified: false,
            isStreetModified: false,
            isHouseModified: false
        };
    }

    componentWillReceiveProps(newProps: AddressEditorProps) {
        this.setState({
            address: newProps.address || new AddressModel()
        });
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
                        onClick={() => this.props.onSubmit(this.state.address, this.state.files)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private renderUploadedImages() {
        const {user} = this.props;
        const {address} = this.state;
        return this.state.address.images
            .filter(image => this.state.deletedImages.indexOf(image) === -1)
            .map(image => (
                    <Thumbnail src={`img/${user.uuid}/addresses/${address.uuid}/${image.fileName}.${image.extension}`}>
                        <Button bsStyle="danger" onClick={() => this.deleteUploadedImage(image)}>Delete</Button>
                    </Thumbnail>
                )
            );
    }

    private renderPreviewImages() {
        return this.state.files.map(file => {
            return (
                <Thumbnail src={(file as any).preview}>
                    <Button bsStyle="danger" onClick={() => this.deleteLocalImage(file)}>Delete</Button>
                </Thumbnail>
            );
        });
    }

    private deleteUploadedImage(img: UrlModel) {
        this.setState({
            deletedImages: [...this.state.deletedImages, img]
        });
    }

    private deleteLocalImage(file: File) {
        this.setState({
            files: this.state.files.filter(f => f !== file)
        });
    }

    private onDrop(files: File[]) {
        this.setState({
            files: this.state.files.concat(files)
        });
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        const address = {...this.state.address, country: event.target.value};
        const errors = this.validate(address);
        this.setState({
            address,
            errors,
            isCountryModified: true
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const address = {...this.state.address, city: event.target.value};
        const errors = this.validate(address);
        this.setState({
            address,
            errors,
            isCityModified: true
        });
    }

    private onStreetChange(event: React.ChangeEvent<any>) {
        const address = {...this.state.address, street: event.target.value};
        const errors = this.validate(address);
        this.setState({
            address,
            errors,
            isStreetModified: true
        });
    }

    private onHouseChange(event: React.ChangeEvent<any>) {
        const address = {...this.state.address, house: event.target.value};
        const errors = this.validate(address);
        this.setState({
            address,
            errors,
            isHouseModified: true
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
    onSubmit: (address: AddressModel, files: File[]) => void;
}

export interface AddressEditorState {
    address: AddressModel;
    deletedImages: UrlModel[];
    files: File[];
    isCountryModified: boolean;
    isCityModified: boolean;
    isStreetModified: boolean;
    isHouseModified: boolean;
    errors: any;
}
