import {render} from 'react-dom';
import * as React from 'react';
import { AddTodoForm, TodoList } from './App';

render(
    <div>
        <h1>Todo</h1>
        <AddTodoForm />
        <TodoList />
    </div>,
    document.getElementById('couch-worker-container')
);