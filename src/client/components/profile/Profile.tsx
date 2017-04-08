import * as React from 'react';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ProfileBirthDate } from './ProfileBirthDate';
import { validateProfile } from './validateProfile';
import { ProfileValidationModel } from './ProfileValidationModel';
import { StringInput } from '../form/StringInput';
import { UserModel } from '../../../shared/model/user/UserModel';

export class Profile extends React.Component<RegistrationProps, RegistrationState> {

    constructor(props: RegistrationProps) {
        super();

        this.state = {
            user: props.user,
            validation: validateProfile(props.user)
        }
    }

    public componentWillReceiveProps(newProps: RegistrationProps) {
        this.setState({
            user: newProps.user
        });
    }

    public render() {
        let validation = validateProfile(this.state.user);
        return (
            <form>
                <StringInput
                    value={this.state.user.getFirstName()}
                    onChange={this.onFirstNameChange.bind(this)}
                    controlId='cw-form-profile-first-name'
                    placeHolder='Enter first name'
                    controlLabel='First name'
                    error={validation.getFirstNameValidationError()}
                />
                <StringInput
                    value={this.state.user.getLastName()}
                    onChange={this.onLastNameChange.bind(this)}
                    controlId='cw-form-profile-last-name'
                    placeHolder='Enter last name'
                    controlLabel='Last name'
                    error={validation.getLastNameValidationError()}
                />
                <StringInput
                    value={this.state.user.getEmail()}
                    onChange={this.onEmailChange.bind(this)}
                    controlId='cw-form-profile-email'
                    placeHolder='Enter email'
                    controlLabel='Email'
                    error={validation.getEmailErrorMessage()}
                />
                <StringInput
                    value={this.state.user.getProfession()}
                    onChange={this.onProfessionChange.bind(this)}
                    controlId='cw-form-profile-profession'
                    placeHolder='Enter profession'
                    controlLabel='Profession'
                    error={validation.getProfessionValidationError()}
                />
                <StringInput
                    value={this.state.user.getAddress().getCountry()}
                    onChange={this.onCountryChange.bind(this)}
                    controlId='cw-form-profile-country'
                    placeHolder='Enter country'
                    controlLabel='Country'
                    error={validation.getCountryValidationError()}
                />
                <StringInput
                    value={this.state.user.getAddress().getCity()}
                    onChange={this.onCityChange.bind(this)}
                    controlId='cw-form-profile-city'
                    placeHolder='Enter city'
                    controlLabel='City'
                    error={validation.getCityValidationError()}
                />
                <ProfileBirthDate 
                    date={this.state.user.getBirthDate()}
                    onChange={this.onBirthDateChange.bind(this)}
                    error={validation.getBirthDateValidationError()}
                />
                <Button
                    bsStyle="primary"
                    onClick={() => {
                        this.props.onSubmit(this.state.user)
                    }}
                    disabled={validation.hasError()}
                >
                    Update profile
                </Button>
                {' '}
                <Button
                    onClick={() => {
                        this.setState({
                            user: this.props.user
                        })
                    }}
                >
                    Cancel
                </Button>
            </form>
        );
    }

    private onFirstNameChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setFirstName(event.target.value) 
        });
    }

    private onLastNameChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setLastName(event.target.value) 
        });        
    }

    private onProfessionChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setProfession(event.target.value) 
        });        
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setAddress(
                this.state.user.getAddress().setCountry(event.target.valuee)
            )
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setAddress(
                this.state.user.getAddress().setCity(event.target.value)
            )
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        this.setState({
            user: this.state.user.setEmail(event.target.value)
        });
    }

    private onBirthDateChange(isoString: string) {
        this.setState({
            user: this.state.user.setBirthDate(new Date(Date.parse(isoString)))
        });
    }
}

interface RegistrationState {
    user: UserModel;
    validation: ProfileValidationModel;
}

export interface RegistrationProps {
    user: UserModel;
    onSubmit: (user: UserModel) => void;
}