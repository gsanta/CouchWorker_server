import { createStore } from 'redux';
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import * as assign from 'object-assign';
import { HostModel } from './HostModel';
import { List } from 'immutable';
import { RootModel } from './RootModel';
import { RECEIVE_HOSTS } from './hosts/hostsActions';
import { hosts } from './hosts/hostsReducers';
import { profile } from './profile/profileReducers';

const rootReducer = combineReducers({
    hosts,
    user: profile,
});

export function configureStore(state: RootModel) {
  return createStore(
    rootReducer,
    state
  )
}