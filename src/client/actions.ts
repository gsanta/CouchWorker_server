import { HostModel } from './HostModel';
import { List } from 'immutable';

export const REQUEST_HOSTS = 'REQUEST_HOSTS';

export function requestHosts() {
  return {
    type: REQUEST_HOSTS
  }
}

export function addTodo(message: string) {
  return {
    type: 'ADD_TODO',
    message: message,
    completed: false
  };
}

export function completeTodo(index: number) {
  return {
    type: 'COMPLETE_TODO',
    index: index
  };
}
 
export function deleteTodo(index: number) {
  return {
    type: 'DELETE_TODO',
    index: index
  };
}
 
export function clearTodo() {
  return {
    type: 'CLEAR_TODO'
  };
}