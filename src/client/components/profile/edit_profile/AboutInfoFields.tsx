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

export class AboutInfoFields extends React.Component<AboutInfoFieldsProps, AboutInfoFieldsState> {
    constructor(props: AboutInfoFieldsProps) {
        super(props);

        const user = props.user || new UserModel();
        this.state = {
            isFirstNameModified: false,
            isLastNameModified: false,
            isEmailModified: false,
            isProfessionModified: false,
            isCountryModified: false,
            isCityModified: false,
            isBirthDateModified: false
        };
    }

    public render() {
        const errors = this.props.errors || {};
        const user = this.props.user;
        return (
            <div>
                <StringInput
                    value={user.firstName}
                    onChange={this.onFirstNameChange.bind(this)}
                    controlId="cw-form-profile-first-name"
                    placeHolder="Enter first name"
                    controlLabel="First name"
                    error={this.state.isFirstNameModified && errors.firstName}
                />
                <StringInput
                    value={user.lastName}
                    onChange={this.onLastNameChange.bind(this)}
                    controlId="cw-form-profile-last-name"
                    placeHolder="Enter last name"
                    controlLabel="Last name"
                    error={this.state.isLastNameModified && errors.lastName}
                />
                <StringInput
                    value={user.email}
                    onChange={this.onEmailChange.bind(this)}
                    controlId="cw-form-profile-email"
                    placeHolder="Enter email"
                    controlLabel="Email"
                    error={this.state.isEmailModified && errors.email}
                />
                <StringInput
                    value={user.profession}
                    onChange={this.onProfessionChange.bind(this)}
                    controlId="cw-form-profile-profession"
                    placeHolder="Enter profession"
                    controlLabel="Profession"
                    error={this.state.isProfessionModified && errors.profession}
                />
                <StringInput
                    value={user.country}
                    onChange={this.onCountryChange.bind(this)}
                    controlId="cw-form-profile-country"
                    placeHolder="Enter country"
                    controlLabel="Country"
                    error={this.state.isCountryModified && errors.country}
                />
                <StringInput
                    value={user.city}
                    onChange={this.onCityChange.bind(this)}
                    controlId="cw-form-profile-city"
                    placeHolder="Enter city"
                    controlLabel="City"
                    error={this.state.isCityModified && errors.city}
                />
                <ProfileBirthDate
                    date={user.birthDate || new Date()}
                    onChange={this.onBirthDateChange.bind(this)}
                    error={this.state.isBirthDateModified && errors.birthDate}
                />
            </div>
        );
    }

    private onFirstNameChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, firstName: event.target.value};
        this.props.onChange(user);

        this.setState({
            isFirstNameModified: true
        });
    }

    private onLastNameChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, lastName: event.target.value};
        this.props.onChange(user);

        this.setState({
            isLastNameModified: true
        });
    }

    private onProfessionChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, profession: event.target.value};
        this.props.onChange(user);

        this.setState({
            isProfessionModified: true
        });
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, country: event.target.value};
        this.props.onChange(user);

        this.setState({
            isCountryModified: true
        });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, city: event.target.value};
        this.props.onChange(user);

        this.setState({
            isCityModified: true
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        const user = {...this.props.user, email: event.target.value};
        this.props.onChange(user);

        this.setState({
            isEmailModified: true
        });
    }

    private onBirthDateChange(isoString: string) {
        const user = {...this.props.user, birthDate: new Date(Date.parse(isoString))};
        this.props.onChange(user);

        this.setState({
            isBirthDateModified: true
        });
    }
}

export interface AboutInfoFieldsProps {
    onChange: (user: UserModel) => void;
    user: UserModel;
    errors: any;
}

interface AboutInfoFieldsState {
    isFirstNameModified: boolean;
    isLastNameModified: boolean;
    isEmailModified: boolean;
    isProfessionModified: boolean;
    isCountryModified: boolean;
    isCityModified: boolean;
    isBirthDateModified: boolean;
}
