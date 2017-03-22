import { createStore } from 'redux';
import { combineReducers } from 'redux'
import * as assign from 'object-assign';
import { HostModel } from './HostModel';
import { List } from 'immutable';
import { RootModel } from './RootModel';
import { RECEIVE_HOSTS } from './hosts/hostsActions';
import { hosts } from './hosts/hostsReducers';
import { profile } from './profile/profileReducers';

const rootReducer = combineReducers({
    hosts,
    user: profile
});


export function configureStore(state: RootModel) {
  return createStore(
    rootReducer,
    state
  )
}

var defaultState: any = {
  todo: {
    items: []
  }
};
 
export function todoApp(state: any, action: any) {
    switch (action.type) {
        case 'ADD_TODO':
            var newState = assign({}, state);
        
            newState.todo.items.push({
                message: action.message,
                completed: false
            });
        
            return newState;

        case 'COMPLETE_TODO':
            var newState = assign({}, state);
        
            newState.todo.items[action.index].completed = true;
        
            return newState;
        
        case 'DELETE_TODO':
            var items = [].concat(state.todo.items);
        
            items.splice(action.index, 1);
        
            return assign({}, state, {
                todo: {
                    items: items
                }
            });
        
        case 'CLEAR_TODO':
            return assign({}, state, {
                todo: {
                    items: []
                }
            });
            
        default:
            return state;
    }
}
 
// var store = createStore(todoApp, defaultState);