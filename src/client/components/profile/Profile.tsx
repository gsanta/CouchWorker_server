
import * as React from 'react';
import { UserModel } from '../../../domain/user/UserModel';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ProfileBirthDate } from './ProfileBirthDate';
import { ProfileStringInput } from './ProfileStringInput';

export class Profile extends React.Component<RegistrationProps, RegistrationState> {

    constructor(props: RegistrationProps) {
        super();

        this.state = {
            user: props.user
        }
    }

    public componentWillReceiveProps(newProps: RegistrationProps) {
        this.setState({
            user: newProps.user
        });
    }

    public render() {
        return (
            <form>
                <ProfileStringInput 
                    value={this.state.user.getFirstName()}
                    onChange={this.onFirstNameChange.bind(this)}
                    validationState='success'
                    controlId='cw-form-profile-first-name'
                    placeHolder='Enter first name'
                    controlLabel='First name'
                    helpBlock='Validation is based on string length.'
                />
                <ProfileStringInput
                    value={this.state.user.getLastName()}
                    onChange={this.onLastNameChange.bind(this)}
                    validationState='success'
                    controlId='cw-form-profile-last-name'
                    placeHolder='Enter last name'
                    controlLabel='Last name'
                    helpBlock='Validation is based on string length.'
                />
                <ProfileStringInput
                    value={this.state.user.getProfession()}
                    onChange={this.onProfessionChange.bind(this)}
                    validationState='success'
                    controlId='cw-form-profile-profession'
                    placeHolder='Enter profession'
                    controlLabel='Profession'
                    helpBlock='Validation is based on string length.'
                />
                <ProfileStringInput
                    value={this.state.user.getAddress().getCountry()}
                    onChange={this.onCountryChange.bind(this)}
                    validationState='success'
                    controlId='cw-form-profile-country'
                    placeHolder='Enter country'
                    controlLabel='Country'
                    helpBlock='Validation is based on string length.'
                />
                <ProfileStringInput
                    value={this.state.user.getAddress().getCity()}
                    onChange={this.onCityChange.bind(this)}
                    validationState='success'
                    controlId='cw-form-profile-city'
                    placeHolder='Enter city'
                    controlLabel='City'
                    helpBlock='Validation is based on string length.'
                />
                <ProfileBirthDate 
                    date={this.state.user.getBirthDate()}
                    onChange={this.onBirthDateChange.bind(this)}
                />
                <Button
                    bsStyle="primary"
                    onClick={() => {
                        this.props.onSubmit(this.state.user)
                    }}
                >
                    Update profile
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

    private onBirthDateChange(isoString: string) {
        this.setState({
            user: this.state.user.setBirthDate(new Date(Date.parse(isoString)))
        });
    }
}

interface RegistrationState {
    user: UserModel;
}

export interface RegistrationProps {
    user: UserModel;
    onSubmit: (user: UserModel) => void;
}