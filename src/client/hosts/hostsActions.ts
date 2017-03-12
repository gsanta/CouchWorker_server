import { List } from 'immutable';
import { HostModel } from '../HostModel';

export const RECEIVE_HOSTS = 'RECEIVE_HOSTS';

export function receiveHosts(hosts: List<HostModel>) {
  return {
    type: RECEIVE_HOSTS,
    hosts
  }
}