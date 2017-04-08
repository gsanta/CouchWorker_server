import { List } from 'immutable';

export const REQUEST_HOSTS = 'REQUEST_HOSTS';

export function requestHosts() {
  return {
    type: REQUEST_HOSTS
  }
}