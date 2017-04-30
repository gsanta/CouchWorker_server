import * as React from 'react';
import { UserModel } from '../../../../shared/model/user/UserModel';
import { Modal, Button } from 'react-bootstrap';
import { StringInput } from '../../form/StringInput';
import { ProfileBirthDate } from '../ProfileBirthDate';
import { AboutInfoValidationModel } from './AboutInfoValidationModel';
import { validateEmail } from '../../../../shared/validation/validateEmail';
import { validateFirstName } from '../../../../shared/validation/validateFirstName';
import { validateLastName } from '../../../../shared/validation/validateLastName';

export class AboutInfoEditor extends React.Component<AboutInfoEditorProps, AboutInfoEditorState> {

    constructor(props: AboutInfoEditorProps) {
        super(props);

        const user = props.user || new UserModel(); 
        this.state = {
            user,
            validation: new AboutInfoValidationModel()
        }
    }

    public render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StringInput
                        value={this.state.user.getFirstName()}
                        onChange={this.onFirstNameChange.bind(this)}
                        controlId='cw-form-profile-first-name'
                        placeHolder='Enter first name'
                        controlLabel='First name'
                        error={this.state.validation.getFirstNameError()}
                    />
                    <StringInput
                        value={this.state.user.getLastName()}
                        onChange={this.onLastNameChange.bind(this)}
                        controlId='cw-form-profile-last-name'
                        placeHolder='Enter last name'
                        controlLabel='Last name'
                        error={this.state.validation.getLastNameError()}
                    />
                    <StringInput
                        value={this.state.user.getEmail()}
                        onChange={this.onEmailChange.bind(this)}
                        controlId='cw-form-profile-email'
                        placeHolder='Enter email'
                        controlLabel='Email'
                        error={this.state.validation.getEmailError()}
                    />
                    <StringInput
                        value={this.state.user.getProfession()}
                        onChange={this.onProfessionChange.bind(this)}
                        controlId='cw-form-profile-profession'
                        placeHolder='Enter profession'
                        controlLabel='Profession'
                        error={this.state.validation.getProfessionError()}
                    />
                    <ProfileBirthDate
                        date={this.state.user.getBirthDate()}
                        onChange={this.onBirthDateChange.bind(this)}
                        error={this.state.validation.getBirthDateError()}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private onFirstNameChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setFirstName(event.target.value);
        let validation: AboutInfoValidationModel = this.state.validation.setFirstNameError(null);
        validateFirstName<AboutInfoValidationModel>(user).ifPresent(error => {
            validation = error.setError(this.state.validation)
        });
        this.setState({
            user,
            validation 
        });
    }

    private onLastNameChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setLastName(event.target.value);
        let validation: AboutInfoValidationModel = this.state.validation.setLastNameError(null);
        validateLastName<AboutInfoValidationModel>(user).ifPresent(error => validation = error.setError(this.state.validation));                
        this.setState({
            user,
            validation
        });        
    }

    private onProfessionChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setProfession(event.target.value);
        this.setState({
            user 
        });        
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setAddresses(
            [this.state.user.getAddresses()[0].setCountry(event.target.value)]
        );
        this.setState({
            user
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setAddresses(
            [this.state.user.getAddresses()[0].setCity(event.target.value)]
        );
        this.setState({
            user
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setEmail(event.target.value);
        let validation: AboutInfoValidationModel = this.state.validation.setEmailError(null);
        validateEmail<AboutInfoValidationModel>(user).ifPresent(error => validation = error.setError(this.state.validation));
        this.setState({
            user,
            validation
        });
    }

    private onBirthDateChange(isoString: string) {
        const user = this.state.user.setBirthDate(new Date(Date.parse(isoString)));
        this.setState({
            user
        });
    }
}

export interface AboutInfoEditorProps {
    user: UserModel,
    isOpen: boolean;
    close: () => void;
}

interface AboutInfoEditorState {
    user: UserModel;
    validation: AboutInfoValidationModel;
}