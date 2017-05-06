import * as React from 'react';
import { AddressModel } from '../../../../shared/model/AddressModel';
import { Modal, Button } from 'react-bootstrap';
import { StringInput } from '../../form/StringInput';

export class AddressEditor extends React.Component<AddressEditorProps, any> {

    public render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StringInput
                        value={this.state.user.firstName}
                        onChange={null}
                        controlId='cw-form-profile-first-name'
                        placeHolder='Enter first name'
                        controlLabel='First name'
                        error={this.state.validation.getFirstNameError()}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button
                        onClick={() => this.props.onSubmit(this.state.user)}>
                        Save
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export interface AddressEditorProps {
    address: AddressModel,
    isOpen: boolean;
    close: () => void;
    onSubmit: (user: AddressModel) => void;
}