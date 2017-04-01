import { UserModel } from '../../domain/user/UserModel';
import { SET_PROFILE } from './profileActions';
import { LOGIN, ASYNC_STATES } from '../components/login/loginActions';


export function profile(state: UserModel = new UserModel(), action: any): UserModel {
  switch (action.type) {    
    case LOGIN:
        if (action.state === ASYNC_STATES.SUCCESS) {
            return action.user;        
        }
        return state;
    case SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
}