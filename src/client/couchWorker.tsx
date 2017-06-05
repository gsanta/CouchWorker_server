import {render} from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RootModel } from './RootModel';
import { configureStore } from './store';
import { List } from 'immutable';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { ProfileWrapper } from './components/profile/ProfileWrapper';
import { LoginWrapper } from './components/login/LoginWrapper';
import { HostDetailWrapper } from './components/host_detail/HostDetailWrapper';
import { AppWrapper } from './components/app/AppWrapper';
import { HostsWrapper } from './components/host/HostsWrapper';
import { UserModel } from '../shared/model/user/UserModel';
import * as validate from 'validate.js';
import * as moment from 'moment';
import { SignupWrapper } from './components/profile/SignupWrapper';

require('bootstrap/dist/css/bootstrap.css');
require('./couchWorker.scss');
require('./bootstrapOverwrite.scss');

(validate as any).extend((validate as any).validators.datetime, {
    parse: function(value, options) {
        return +moment.utc(value);
    },
    format: function(value, options) {
        const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
        return moment.utc(value).format(format);
    }
});

let initialState: RootModel = {
    hosts: List<UserModel>(),
    // List<HostModel>([
    //     new HostModel(
    //         {
    //             firstName: 'Santa',
    //             lastName: 'Gergely',
    //             birthDate: new Date(1990, 2, 0),
    //             email: 'santagergely@gmail.com',
    //             address: new AddressModel({
    //                 country: 'Hungary',
    //                 city: 'Budapest'
    //             }),
    //             rating: new RatingModel(5)
    //         }
    //     ),
    //     new HostModel(
    //         {
    //             firstName: 'User2',
    //             lastName: 'Abcd',
    //             birthDate: new Date(1920, 1, 12),
    //             email: 'user2@gmail.com',
    //             address: new AddressModel({
    //                 country: 'London',
    //                 city: 'UK'
    //             }),
    //             rating: new RatingModel(3.4)
    //         }
    //     ),
    //     new HostModel(
    //         {
    //             firstName: 'User3',
    //             lastName: 'Efgh',
    //             birthDate: new Date(1988, 4, 20),
    //             email: 'user3@gmail.com',
    //             address: new AddressModel({
    //                 country: 'Hungary',
    //                 city: 'Budapest'
    //             }),
    //             rating: new RatingModel(4.2)
    //         }
    //     )
    // ]),
    user: undefined,
    // new UserModel({
    //     firstName: 'New',
    //     lastName: 'User',
    //     birthDate: new Date(1980, 11, 28),
    //     email: 'new_user@gmail.com',
    //     profession: 'Drummer',
    //     country: 'Hungary',
    //     city: 'Budapest',
    //     id: null
    // })
    editedComponent: null
};

let store = configureStore(initialState);

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppWrapper}>
                <IndexRedirect to="/hosts" />
                <Route path="/hosts(/:page)" component={HostsWrapper} />
                <Route path="/host(/:id)" component={HostDetailWrapper} />
                <Route path="/profile" component={ProfileWrapper} />
                <Route path="/signup" component={SignupWrapper} />
                <Route path="/login" component={LoginWrapper} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('couch-worker-container')
);
