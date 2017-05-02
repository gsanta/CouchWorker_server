import { createStore } from 'redux';
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import * as assign from 'object-assign';
import { List } from 'immutable';
import { RootModel } from './RootModel';
import { hosts } from './hosts/hostsReducers';
import thunk from 'redux-thunk';
import { profile } from './components/profile/profileReducers';
import { editModeReducer } from './reducers/editModeReducer';

const rootReducer = combineReducers({
    hosts,
    user: profile,
    editedComponent: editModeReducer
});

export function configureStore(state: RootModel) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunk)
  )
}