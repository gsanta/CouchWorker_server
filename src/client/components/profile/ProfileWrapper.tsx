import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Hosts } from '../Hosts';
import { Profile } from './Profile';
import { UserModel } from '../../../domain/user/UserModel';
import { setProfile } from '../../profile/profileActions';

const mapStateToProps = (state: RootModel) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (user: UserModel) => {
      dispatch(setProfile(user))
    }
  }
}

export const ProfileWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
