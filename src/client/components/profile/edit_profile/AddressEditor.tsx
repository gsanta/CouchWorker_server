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
import { AddressFields } from './AddressFields';
import { ImageUploader } from './ImageUploader';

function getInitialState(props: AddressEditorProps) {
    return {
        address: props.address,
        images: props.address.images,
        removableRemoteImages: [],
        errors: null,
    };
}

export class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);

        this.onAddressChange = this.onAddressChange.bind(this);
        this.onAddImages = this.onAddImages.bind(this);
        this.onDeleteImage = this.onDeleteImage.bind(this);
        this.state = getInitialState(props);
    }

    componentWillReceiveProps(newProps: AddressEditorProps) {
        if (!this.props.isOpen && newProps.isOpen) {
            this.setState(getInitialState(newProps));
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
                            <AddressFields
                                address={this.state.address}
                                onAddressChange={this.onAddressChange}
                                errors={this.state.errors}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Images">
                            <ImageUploader
                                images={this.state.images}
                                onAddImages={this.onAddImages}
                                onDeleteImage={this.onDeleteImage}
                            />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button
                        disabled={this.state.errors}
                        onClick={() => this.props.onSubmit(this.state.address, this.state.images, this.state.removableRemoteImages)}>
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
            images: [...this.state.images, ...images]
        });
    }

    private onDeleteImage(image: ImageSrc) {
        let removableRemoteImages = this.state.removableRemoteImages;
        if ((image as any).fileName) {
            removableRemoteImages = [...removableRemoteImages, image as UrlModel];
        }

        this.setState({
            removableRemoteImages: removableRemoteImages,
            images: this.state.images.filter(img => img !== image)
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
    onSubmit: (address: AddressModel, newImages: ImageSrc[], deletedImages: ImageSrc[]) => void;
}

export interface AddressEditorState {
    address: AddressModel;
    images: ImageSrc[];
    removableRemoteImages: UrlModel[];
    errors: any;
}
