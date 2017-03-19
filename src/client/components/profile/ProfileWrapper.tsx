import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Hosts } from '../Hosts';
import { Profile } from './Profile';

const mapStateToProps = (state: RootModel) => {
  return {
    user: state.user
  }
}

export const ProfileWrapper = connect(
  mapStateToProps
)(Profile)
