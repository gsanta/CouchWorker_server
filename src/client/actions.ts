


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