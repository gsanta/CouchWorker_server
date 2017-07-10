import * as React from 'react';
import { UserModel } from '../../../../shared/model/user/UserModel';
import { Modal, Button } from 'react-bootstrap';
import { StringInput } from '../../form/StringInput';
import { ProfileBirthDate } from '../ProfileBirthDate';
import { AboutInfoValidationModel } from './AboutInfoValidationModel';
import { validateEmail } from '../../../../shared/validation/validateEmail';
import { validateFirstName } from '../../../../shared/validation/validateFirstName';
import { validateLastName } from '../../../../shared/validation/validateLastName';
import { validateCountry } from '../../../../shared/validation/validateCountry';
import { validateCity } from '../../../../shared/validation/validateCity';
import { optionalValidationErrorDecorator } from '../../../../shared/validation/optionalValidationErrorDecorator';
import * as validate from 'validate.js';
import { userValidator } from '../../../../shared/model/user/userValidator';
import { AboutInfoFields } from './AboutInfoFields';

export class AboutInfoEditor extends React.Component<AboutInfoEditorProps, AboutInfoEditorState> {
    constructor(props: AboutInfoEditorProps) {
        super(props);

        const user = props.user || new UserModel();
        this.state = {
            user,
            errors: null
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
            <Modal show={this.props.isOpen} onHide={this.props.close} backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AboutInfoFields onChange={this.onAboutInfoChange.bind(this)} user={this.state.user} errors={errors}/>
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

    private onAboutInfoChange(user: UserModel) {
        const errors = this.validate(user);

        this.setState({
            user,
            errors
        });
    }

    private validate(model: UserModel) {
        return (validate as any).validate(model, userValidator);
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
}
