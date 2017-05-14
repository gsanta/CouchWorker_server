import * as React from 'react';
import { AddressModel } from '../../../../shared/model/AddressModel';
import { Modal, Button } from 'react-bootstrap';
import { StringInput } from '../../form/StringInput';
import * as validate from 'validate.js';
import { addressValidator } from '../../../../shared/model/addressValidator';

export class AddressEditor extends React.Component<AddressEditorProps, AddressEditorState> {

    constructor(props: AddressEditorProps) {
        super(props);

        this.state = {
            address: this.props.address,
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
            <Modal show={this.props.isOpen} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StringInput
                        value={this.state.address.country}
                        onChange={this.onCountryChange.bind(this)}
                        controlId="cw-form-address-country"
                        placeHolder="Enter country"
                        controlLabel="Country"
                        error={this.state.isCountryModified && errors.country}
                    />
                    <StringInput
                        value={this.state.address.city}
                        onChange={this.onCityChange.bind(this)}
                        controlId="cw-form-address-city"
                        placeHolder="Enter city"
                        controlLabel="City"
                        error={this.state.isCityModified && errors.city}
                    />
                    <StringInput
                        value={this.state.address.street}
                        onChange={this.onStreetChange.bind(this)}
                        controlId="cw-form-address-street"
                        placeHolder="Enter street"
                        controlLabel="Street"
                        error={this.state.isStreetModified && errors.street}
                    />
                    <StringInput
                        value={this.state.address.house}
                        onChange={this.onHouseChange.bind(this)}
                        controlId="cw-form-address-house"
                        placeHolder="Enter house"
                        controlLabel="House"
                        error={this.state.isHouseModified && errors.house}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button
                        disabled={this.state.errors}
                        onClick={() => this.props.onSubmit(this.state.address)}>
                        Save
                        </Button>
                </Modal.Footer>
            </Modal>
        );
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
    address: AddressModel;
    isOpen: boolean;
    close: () => void;
    onSubmit: (user: AddressModel) => void;
}

export interface AddressEditorState {
    address: AddressModel;
    isCountryModified: boolean;
    isCityModified: boolean;
    isStreetModified: boolean;
    isHouseModified: boolean;
    errors: any;
}
