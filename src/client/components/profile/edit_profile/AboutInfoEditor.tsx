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

export class AboutInfoEditor extends React.Component<AboutInfoEditorProps, AboutInfoEditorState> {

    constructor(props: AboutInfoEditorProps) {
        super(props);

        const user = props.user || new UserModel(); 
        this.state = {
            user,
            validation: new AboutInfoValidationModel()
        }
    }
    
    public componentWillReceiveProps(newProps: AboutInfoEditorProps) {
        this.setState({
            user: newProps.user || new UserModel()
        });
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
                    <StringInput
                        value={this.state.user.getCountry() || ""}
                        onChange={this.onCountryChange.bind(this)}
                        controlId='cw-form-profile-country'
                        placeHolder='Enter country'
                        controlLabel='Country'
                        error={this.state.validation.getCountryError()}
                    />
                    <StringInput
                        value={this.state.user.getCity()}
                        onChange={this.onCityChange.bind(this)}
                        controlId='cw-form-profile-city'
                        placeHolder='Enter city'
                        controlLabel='City'
                        error={this.state.validation.getCityError()}
                    />
                    <ProfileBirthDate
                        date={this.state.user.getBirthDate() || new Date()}
                        onChange={this.onBirthDateChange.bind(this)}
                        error={this.state.validation.getBirthDateError()}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Cancel</Button>
                    <Button 
                        disabled={this.state.validation.hasError()}
                        onClick={() => this.props.onSubmit(this.state.user)}>
                        Save
                    </Button>
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
        const user = this.state.user.setCountry(event.target.value);
        let validation: AboutInfoValidationModel = this.state.validation.setCountryError(null);
        validateCountry<AboutInfoValidationModel>(user).ifPresent(error => validation = error.setError(this.state.validation));  
        this.setState({
            user,
            validation            
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setCity(event.target.value);
        let validation: AboutInfoValidationModel = this.state.validation.setCityError(null);
        validateCity<AboutInfoValidationModel>(user).ifPresent(error => validation = error.setError(this.state.validation));  

        this.setState({
            user,
            validation            
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
    onSubmit: (user: UserModel) => void;
}

interface AboutInfoEditorState {
    user: UserModel;
    validation: AboutInfoValidationModel;
}