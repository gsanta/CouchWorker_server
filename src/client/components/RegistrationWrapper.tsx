import { RootModel } from '../RootModel';
import { connect } from 'react-redux';
import { Hosts } from './Hosts';
import { Registration } from './Registration';

const mapStateToProps = (state: RootModel) => {
  return {
    user: state.user
  }
}

export const RegistrationWrapper = connect(
  mapStateToProps
)(Registration)
