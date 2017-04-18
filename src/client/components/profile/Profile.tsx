import * as React from 'react';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ProfileBirthDate } from './ProfileBirthDate';
import { validateFirstName, validateProfile, validateLastName } from './validateProfile';
import { ProfileValidationModel } from './ProfileValidationModel';
import { StringInput } from '../form/StringInput';
import { UserModel } from '../../../shared/model/user/UserModel';
import { validateEmail } from '../../../shared/validation/validateEmail';
import './Profile.scss';
import { Address } from './address/Address';
import { AddressModel } from '../../../shared/model/AddressModel';

export class Profile extends React.Component<RegistrationProps, RegistrationState> {

    constructor(props: RegistrationProps) {
        super();

        const user = props.user || new UserModel(); 
        this.state = {
            user,
            validation: new ProfileValidationModel()
        }
    }

    public componentWillReceiveProps(newProps: RegistrationProps) {
        this.setState({
            user: newProps.user || new UserModel()
        });
    }

    public render() {
        let addressProps = [
            new AddressModel({
                    country: 'Hungary',
                    city: 'Budapest',
                    street: 'Baross utca',
                    house: '132',
                    uuid: null
                }
            )
        ];
        let addresses = [];
        for (var i = 0; i < 1; i++) {
            addresses.push(<Address address={addressProps[i]}/>)
        }
        return (
            <form>
                <h2>About</h2>
                <StringInput
                    value={this.state.user.getFirstName()}
                    onChange={this.onFirstNameChange.bind(this)}
                    controlId='cw-form-profile-first-name'
                    placeHolder='Enter first name'
                    controlLabel='First name'
                    error={this.state.validation.getFirstNameValidationError()}
                />
                <StringInput
                    value={this.state.user.getLastName()}
                    onChange={this.onLastNameChange.bind(this)}
                    controlId='cw-form-profile-last-name'
                    placeHolder='Enter last name'
                    controlLabel='Last name'
                    error={this.state.validation.getLastNameValidationError()}
                />
                <StringInput
                    value={this.state.user.getEmail()}
                    onChange={this.onEmailChange.bind(this)}
                    controlId='cw-form-profile-email'
                    placeHolder='Enter email'
                    controlLabel='Email'
                    error={this.state.validation.getEmailErrorMessage()}
                />
                <StringInput
                    value={this.state.user.getProfession()}
                    onChange={this.onProfessionChange.bind(this)}
                    controlId='cw-form-profile-profession'
                    placeHolder='Enter profession'
                    controlLabel='Profession'
                    error={this.state.validation.getProfessionValidationError()}
                />
                <ProfileBirthDate 
                    date={this.state.user.getBirthDate()}
                    onChange={this.onBirthDateChange.bind(this)}
                    error={this.state.validation.getBirthDateValidationError()}
                />

                <section className="cw-address-section">
                    <div className="cw-address-section-header"><h2>Address(es)</h2></div>
                    {addresses}
                </section>
                <Button
                    bsStyle="primary"
                    onClick={() => {
                        this.onSubmit()
                    }}
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

    private onSubmit() {
        let validation = validateProfile(this.state.user);
        if (!validation.hasError()) {
            this.props.onSubmit(this.state.user);
        }

        this.setState({
            validation
        });
    }

    private onFirstNameChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setFirstName(event.target.value);
        let validation: ProfileValidationModel = this.state.validation.setFirstNameValidationError(null);
        validateFirstName(user).ifPresent(error => {
            validation = error.setError(this.state.validation)
        });
        this.setState({
            user,
            validation 
        });
    }

    private onLastNameChange(event: React.ChangeEvent<any>) {
        const user = this.state.user.setLastName(event.target.value);
        let validation: ProfileValidationModel = this.state.validation.setLastNameValidationError(null);
        validateLastName(user).ifPresent(error => validation = error.setError(this.state.validation));                
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
        let validation: ProfileValidationModel = this.state.validation.setEmailErrorMessage(null);
        validateEmail<ProfileValidationModel>(user).ifPresent(error => validation = error.setError(this.state.validation));
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

interface RegistrationState {
    user: UserModel;
    validation: ProfileValidationModel;
}

export interface RegistrationProps {
    user: UserModel;
    onSubmit: (user: UserModel) => void;
}