
import * as React from 'react';
import { LoginModel } from './LoginModel';
import { StringInput } from '../form/StringInput';
import { Button } from 'react-bootstrap';
import { validateLogin } from './validateLogin';

export class Login extends React.Component<LoginProps, LoginState> {
    
    constructor() {
        super();

        this.state = {
            model: new LoginModel()
        }
    }

    public render() {
        let validation = validateLogin(this.state.model);

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
                        error={validation.getEmailErrorMessage()}
                    />
                    <StringInput
                        value={this.state.model.getPassword()}
                        onChange={this.onPasswordChange.bind(this)}
                        controlId='cw-form-login-password'
                        placeHolder='Enter password'
                        controlLabel='Password'
                        error={validation.getPasswordErrorMessage()}
                        type='password'
                    />
                    <Button
                        bsStyle="primary"
                        onClick={() => {
                            this.props.onSubmit(this.state.model)
                        }}
                        disabled={validation.hasError()}
                    >
                        Update profile
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

    private onEmailChange(event: React.ChangeEvent<any>) {
        this.setState({
            model: this.state.model.setEmail(event.target.value)
        });
    }

    private onPasswordChange(event: React.ChangeEvent<any>) {
        this.setState({
            model: this.state.model.setPassword(event.target.value)
        })
    }
}

export interface LoginState {
    model: LoginModel;
}

export interface LoginProps {
    onSubmit: (login: LoginModel) => void;
}