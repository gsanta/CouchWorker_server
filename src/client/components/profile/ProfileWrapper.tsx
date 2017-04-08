import { RootModel } from '../../RootModel';
import { connect } from 'react-redux';
import { Profile } from './Profile';
import { setProfile } from '../../profile/profileActions';
import { UserModel } from '../../../shared/model/user/UserModel';

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
