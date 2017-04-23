import { List } from 'immutable';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { UserModel } from '../../shared/model/user/UserModel';

export function hosts(state: List<UserModel> = List<UserModel>(), action: any): List<UserModel> {
  switch (action.type) {
    case FETCH_HOSTS:
        if (action.state === ASYNC_STATES.SUCCESS) {
            return action.hosts;        
        }
      return state;
    default:
      return state;
  }
}