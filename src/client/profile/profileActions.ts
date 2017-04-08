import { UserModel } from '../../shared/model/user/UserModel';
export const SET_PROFILE = 'SET_PROFILE';

export function setProfile(profile: UserModel) {
  return {
    type: SET_PROFILE,
    profile
  }
}