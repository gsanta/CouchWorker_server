import { List } from 'immutable';
import { HostModel } from '../HostModel';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';

export function hosts(state: List<HostModel> = List<HostModel>(), action: any): List<HostModel> {
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