import { List } from 'immutable';
import { FETCH_HOSTS } from './hostsActions';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { HostModel } from '../../shared/model/host/HostModel';

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