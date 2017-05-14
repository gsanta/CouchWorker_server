import { LOGIN } from '../login/loginActions';
import { UserModel } from '../../../shared/model/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { SIGNUP, LOGOUT, PROFILE } from './profileActions';
import { UPDATE_ABOUT_INFO_RESPONSE } from '../../actions/profile/aboutInfoActions';
import { UPDATE_ADDRESS_RESPONSE } from '../../actions/profile/addressActions';

export function profile(state: UserModel = new UserModel(), action: any): UserModel {
  switch (action.type) {    
    case LOGIN:
        if (action.state === ASYNC_STATES.SUCCESS) {
            return action.user;        
        }
        return state;
    case SIGNUP:
        if (action.state === ASYNC_STATES.SUCCESS) {
            return action.user;        
        }
        return state;
    case LOGOUT:
      return null;
    case PROFILE:
        if (action.state === ASYNC_STATES.SUCCESS) {
            return action.user;        
        }
        return state;
    case UPDATE_ABOUT_INFO_RESPONSE:
        return action.user;
    case UPDATE_ADDRESS_RESPONSE:
        return action.user;
    default:
        return state;
  }
}