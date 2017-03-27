
import * as React from 'react';
import { LoginModel } from './LoginModel';
import { StringInput } from '../form/StringInput';
import { Button } from 'react-bootstrap';

export class Login extends React.Component<null, LoginState> {
    
    constructor() {
        super();

        this.state = {
            model: new LoginModel()
        }
    }

    public render() {
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
                        error={null}
                    />
                    <StringInput
                        value={this.state.model.getPassword()}
                        onChange={this.onPasswordChange.bind(this)}
                        controlId='cw-form-login-password'
                        placeHolder='Enter password'
                        controlLabel='Password'
                        error={null}
                        type='password'
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