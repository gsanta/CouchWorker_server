import * as React from 'react';
import { StringInput } from '../form/StringInput';
import { Button } from 'react-bootstrap';
import { LoginModel } from '../../../shared/model/login/LoginModel';
import { LoginValidationModel } from '../../../shared/model/login/LoginValidationModel';
import { validateEmail } from '../../../shared/validation/validateEmail';
import { validatePassword } from '../../../shared/validation/validatePassword';
import validate from 'validate.js';
import * as passport from 'passport';
import { loginValidator } from '../../../shared/model/login/loginValidator';

export class Login extends React.Component<LoginProps, LoginState> {

    constructor() {
        super();

        this.state = {
            model: new LoginModel(),
            errors: null
        };
    }

    public render() {
        return (
            <div>
                <div>Login page</div>
                <form>
                    <StringInput
                        value={this.state.model.email}
                        onChange={this.onEmailChange.bind(this)}
                        controlId="cw-form-login-email"
                        placeHolder="Enter email"
                        controlLabel="Email"
                        error={this.state.errors.email}
                    />
                    <StringInput
                        value={this.state.model.password}
                        onChange={this.onPasswordChange.bind(this)}
                        controlId="cw-form-login-password"
                        placeHolder="Enter password"
                        controlLabel="Password"
                        error={this.state.errors.password}
                        type="password"
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
        const errors = this.validate(this.state.model);
        if (!errors) {
            this.props.onSubmit(this.state.model);
        }

        this.setState({
            errors
        });
    }

    private onEmailChange(event: React.ChangeEvent<any>) {
        const val = event.target.value;
        const model = {...this.state.model, email: val};
        const errors = this.validate(model);
        this.setState({
            model,
            errors
        });
    }

    private onPasswordChange(event: React.ChangeEvent<any>) {
        const val = event.target.value;
        const model = {...this.state.model, password: val};
        const errors = this.validate(model);
        this.setState({
            model,
            errors
        });
    }

    private validate(model: LoginModel) {
        return validate(model, loginValidator);
    }
}

export interface LoginState {
    model: LoginModel;
    errors: any;
}

export interface LoginProps {
    onSubmit: (login: LoginModel) => void;
}
