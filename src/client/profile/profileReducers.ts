import { SET_PROFILE } from './profileActions';
import { LOGIN} from '../components/login/loginActions';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { UserModel } from '../../shared/model/user/UserModel';

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