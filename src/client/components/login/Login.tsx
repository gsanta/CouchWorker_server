import * as React from 'react';
import { StringInput } from '../form/StringInput';
import { Button } from 'react-bootstrap';
import { validateLogin } from './validateLogin';
import { LoginModel } from '../../../shared/model/login/LoginModel';
import { LoginValidationModel } from '../../../shared/model/login/LoginValidationModel';
import { validateEmail } from '../../../shared/validation/validateEmail';
import { validatePassword } from '../../../shared/validation/validatePassword';

export class Login extends React.Component<LoginProps, LoginState> {
    
    constructor() {
        super();

        this.state = {
            model: new LoginModel(),
            validation: new LoginValidationModel()
        }
    }

    public render() {
        console.log('eeeeeee', this.state.validation.getEmailErrorMessage())
        return (
            <div>
                <div>Login page</div>
                <form>
                    <StringInput
                        value={this.state.model.getEmail()}
                        onChange={this.onEmailChange.bind(this)}
                        controlId='cw-form-login-email'
                        placeHolder='Enter email'
                        controlLabel='Email'
                        error={this.state.validation.getEmailErrorMessage()}
                    />
                    <StringInput
                        value={this.state.model.getPassword()}
                        onChange={this.onPasswordChange.bind(this)}
                        controlId='cw-form-login-password'
                        placeHolder='Enter password'
                        controlLabel='Password'
                        error={this.state.validation.getPasswordErrorMessage()}
                        type='password'
                    />
                    <Button
                        bsStyle="primary"
                        onClick={() => this.onSubmit()}
                    >
                        Login
                    </Button>
                    {' '}
                    <Button
                        onClick={() => {
                            this.setState({
                                model: new LoginModel()
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }

    private onSubmit() {
        const validation = validateLogin(this.state.model);
        if (!validation.hasError()) {
            this.props.onSubmit(this.state.model);
        }

        this.setState({
            validation
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        const val = event.target.value;
        const model = this.state.model.setEmail(val);
        let validation = this.state.validation.setEmailErrorMessage(null);
        validateEmail<LoginValidationModel>(model).ifPresent(error => validation = error.setError(validation)); 
        this.setState({
            model,
            validation
        });
    }

    private onPasswordChange(event: React.ChangeEvent<any>) {
        const val = event.target.value;
        const model = this.state.model.setPassword(val);
        let validation = this.state.validation.setPasswordErrorMessage(null);
        validatePassword<LoginValidationModel>(model).ifPresent(error => validation = error.setError(validation));
        this.setState({
            model,
            validation
        });
    }
}

export interface LoginState {
    model: LoginModel;
    validation: LoginValidationModel;
}

export interface LoginProps {
    onSubmit: (login: LoginModel) => void;
}