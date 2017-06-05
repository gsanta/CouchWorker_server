import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserModel } from '../../../shared/model/user/UserModel';

export class Signup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        const user = props.user || new UserModel();
        this.state = {
            user,
            errors: null,
            isFirstNameModified: false,
            isLastNameModified: false,
            isEmailModified: false,
            isProfessionModified: false,
            isCountryModified: false,
            isCityModified: false,
            isBirthDateModified: false
        };
    }

    public componentWillReceiveProps(newProps: AboutInfoEditorProps) {
        this.setState({
            user: newProps.user || new UserModel()
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

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button
                        disabled={this.state.errors}
                        onClick={() => this.props.onSubmit(this.state.user)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export interface AboutInfoEditorProps {
    user: UserModel;
    isOpen: boolean;
    close: () => void;
    onSubmit: (user: UserModel) => void;
}

interface AboutInfoEditorState {
    user: UserModel;
    errors: any;
    isFirstNameModified: boolean;
    isLastNameModified: boolean;
    isEmailModified: boolean;
    isProfessionModified: boolean;
    isCountryModified: boolean;
    isCityModified: boolean;
    isBirthDateModified: boolean;
}
