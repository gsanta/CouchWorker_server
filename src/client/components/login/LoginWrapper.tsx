import { RootModel } from '../../RootModel';
import { login } from './loginActions';
import { Login } from './Login';
import { connect } from 'react-redux';
import { LoginModel } from '../../../shared/model/login/LoginModel';

const mapStateToProps = (state: RootModel) => {
    return {};
}

const mapDispatchToProps = (dispatch, props: any) => {
    return {
        onSubmit: (model: LoginModel) => {
            dispatch(login(model))
            .then((data) => {
                props.history.push('/');
            });
        }
    }
}

export const LoginWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
