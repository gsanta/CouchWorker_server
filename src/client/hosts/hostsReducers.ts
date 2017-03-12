import { List } from 'immutable';
import { HostModel } from '../HostModel';
import { RECEIVE_HOSTS } from './hostsActions';

export function hosts(state: List<HostModel> = List<HostModel>(), action: any): List<HostModel> {
  switch (action.type) {
    case RECEIVE_HOSTS:
      return action.hosts;
    default:
      return state;
  }
}