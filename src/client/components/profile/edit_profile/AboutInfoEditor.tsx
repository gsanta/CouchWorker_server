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

export class AboutInfoEditor extends React.Component<AboutInfoEditorProps, AboutInfoEditorState> {
    constructor(props: AboutInfoEditorProps) {
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
                    <StringInput
                        value={this.state.user.firstName}
                        onChange={this.onFirstNameChange.bind(this)}
                        controlId="cw-form-profile-first-name"
                        placeHolder="Enter first name"
                        controlLabel="First name"
                        error={this.state.isFirstNameModified && errors.firstName}
                    />
                    <StringInput
                        value={this.state.user.lastName}
                        onChange={this.onLastNameChange.bind(this)}
                        controlId="cw-form-profile-last-name"
                        placeHolder="Enter last name"
                        controlLabel="Last name"
                        error={this.state.isLastNameModified && errors.lastName}
                    />
                    <StringInput
                        value={this.state.user.email}
                        onChange={this.onEmailChange.bind(this)}
                        controlId="cw-form-profile-email"
                        placeHolder="Enter email"
                        controlLabel="Email"
                        error={this.state.isEmailModified && errors.email}
                    />
                    <StringInput
                        value={this.state.user.profession}
                        onChange={this.onProfessionChange.bind(this)}
                        controlId="cw-form-profile-profession"
                        placeHolder="Enter profession"
                        controlLabel="Profession"
                        error={this.state.isProfessionModified && errors.profession}
                    />
                    <StringInput
                        value={this.state.user.country}
                        onChange={this.onCountryChange.bind(this)}
                        controlId="cw-form-profile-country"
                        placeHolder="Enter country"
                        controlLabel="Country"
                        error={this.state.isCountryModified && errors.country}
                    />
                    <StringInput
                        value={this.state.user.city}
                        onChange={this.onCityChange.bind(this)}
                        controlId="cw-form-profile-city"
                        placeHolder="Enter city"
                        controlLabel="City"
                        error={this.state.isCityModified && errors.city}
                    />
                    <ProfileBirthDate
                        date={this.state.user.birthDate || new Date()}
                        onChange={this.onBirthDateChange.bind(this)}
                        error={this.state.isBirthDateModified && errors.birthDate}
                    />

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

    private onFirstNameChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, firstName: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isFirstNameModified: true
        });
    }

    private onLastNameChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, lastName: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isLastNameModified: true
        });
    }

    private onProfessionChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, profession: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isProfessionModified: true
        });
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, country: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isCountryModified: true
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, city: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isCityModified: true
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        const user = {...this.state.user, email: event.target.value};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isEmailModified: true
        });
    }

    private onBirthDateChange(isoString: string) {
        const user = {...this.state.user, birthDate: new Date(Date.parse(isoString))};
        const errors = this.validate(user);
        this.setState({
            user,
            errors,
            isBirthDateModified: true
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
    isFirstNameModified: boolean;
    isLastNameModified: boolean;
    isEmailModified: boolean;
    isProfessionModified: boolean;
    isCountryModified: boolean;
    isCityModified: boolean;
    isBirthDateModified: boolean;
}
