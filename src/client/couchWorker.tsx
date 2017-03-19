import {render} from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RootModel } from './RootModel';
import { configureStore } from './store';
import { HostsWrapper } from './components/HostsWrapper';
import { HostModel } from './HostModel';
import { List } from 'immutable';
import { AddressModel } from '../domain/user/AddressModel';
import { RatingModel } from '../domain/user/RatingModel';
import { PersonalInfoModel } from '../domain/user/PersonalInfoModel';
import { Router, Route, browserHistory } from 'react-router';
import { Registration } from './components/Registration';
import { UserModel } from '../domain/user/UserModel';
import { RegistrationWrapper } from './components/RegistrationWrapper';

require('bootstrap/dist/css/bootstrap.css');
require('./couchWorker.scss');

let initialState: RootModel = {
    hosts: List<HostModel>([
        new HostModel(
            new PersonalInfoModel('Santa', 'Gergely', new Date(1990, 2, 0)),
            new AddressModel({
                country: 'Hungary',
                city: 'Budapest'
            }),
            new RatingModel(5)
        ),
        new HostModel(
            new PersonalInfoModel('User2', 'Abcd', new Date(1920, 1, 12)),
            new AddressModel({
                country: 'London',
                city: 'UK'
            }),
            new RatingModel(3.4)
        ),
        new HostModel(
            new PersonalInfoModel('User2', 'Efgh', new Date(1988, 4, 20)),
            new AddressModel({
                country: 'Hungary',
                city: 'Budapest'
            }),
            new RatingModel(4.2)
        )        
    ]),
    user: new UserModel({
        name: 'New User',
        age: 25,
        profession: 'Drummer',
        email: 'new_user@gmail.com',
        address: {
            country: 'Hungary',
            city: 'Budapest'
        },
        id: null
    })
}

let store = configureStore(initialState);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={HostsWrapper} />
            <Route path='/register' component={RegistrationWrapper} />
        </Router>
    </Provider>,
    document.getElementById('couch-worker-container')
);