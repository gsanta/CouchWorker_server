import { LOGIN } from '../login/loginActions';
import { UserModel } from '../../../shared/model/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { SIGNUP, LOGOUT, PROFILE } from './profileActions';
import { UDPATE_ABOUT_INFO_RESPONSE } from '../../actions/profile/aboutInfoActions';

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
    case UDPATE_ABOUT_INFO_RESPONSE:
        return action.user;
    default:
        return state;
  }
}