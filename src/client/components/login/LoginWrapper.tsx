import { RootModel } from '../../RootModel';
import { LoginModel } from './LoginModel';
import { login } from './loginActions';
import { Login } from './Login';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootModel) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (model: LoginModel) => {
      dispatch(login(model))
    }
  }
}

export const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
