import {render} from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RootModel } from './RootModel';
import { configureStore } from './store';
import { HostsWrapper } from './components/HostsWrapper';
import { HostModel } from './HostModel';
import { List } from 'immutable';

let initialState: RootModel = {
    hosts: List<HostModel>([
        new HostModel('Santa Gergely', 27)
    ])
}

let store = configureStore(initialState);

render(
    <Provider store={store}>
        <HostsWrapper />
    </Provider>,
    document.getElementById('couch-worker-container')
);