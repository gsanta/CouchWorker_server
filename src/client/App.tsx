import * as React from 'react';
import { todoApp } from './store';
import { createStore } from 'redux';
import { addTodo, deleteTodo, completeTodo } from './actions';

var defaultState: any = {
  todo: {
    items: []
  }
};

var store = createStore(todoApp, defaultState);

export class AddTodoForm extends React.Component<any, any> {
  state = {
    message: ''
  };
 
  onFormSubmit(e: any) {
    e.preventDefault();
    store.dispatch(addTodo(this.state.message));
    this.setState({ message: '' });
  }
 
  onMessageChanged(e: any) {
    var message = e.target.value;
    this.setState({ message: message });
  }
 
  render() {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <input type="text" placeholder="Todo..." onChange={this.onMessageChanged.bind(this)} value={this.state.message} />
        <input type="submit" value="Add" />
      </form>
    );
  }
}
 
class TodoItem extends React.Component<any, any> {
  onDeleteClick() {
    store.dispatch(deleteTodo(this.props.index));
  }
 
  onCompletedClick() {
    store.dispatch(completeTodo(this.props.index));
  }
 
  render() {
    return (
      <li>
        <a href="#" onClick={this.onCompletedClick.bind(this)} style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>{this.props.message.trim()}</a> 
        <a href="#" onClick={this.onDeleteClick.bind(this)} style={{textDecoration: 'none'}}>[x]</a>
      </li>
    );
  }
}
 
export class TodoList extends React.Component<any, any> {
  state: any = {
    items: []
  };
 
  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        items: state.todo.items
      });
    });
  }
 
  render() {
    var items: any[] = [];
 
    this.state.items.forEach((item: any, index: number) => {
      items.push(<TodoItem
        key={index}
        index={index}
        message={item.message}
        completed={item.completed}
      />);
    });
 
    if (!items.length) {
      return (
        <p>
          <i>Please add something to do.</i>
        </p>
      );
    }
 
    return (
      <ol>{ items }</ol>
    );
  }
}

// export class App extends React.Component<any, any> {

//     public render() {
//         return <div>App</div>
//     }
// }