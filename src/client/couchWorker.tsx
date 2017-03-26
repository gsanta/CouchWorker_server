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
import { UserModel } from '../domain/user/UserModel';
import { ProfileWrapper } from './components/profile/ProfileWrapper';
import { Header } from './Header';
import createHistory from 'history/createBrowserHistory'
import * as reactRouter from 'react-router-redux';

const ReactRouter: any = reactRouter;

const history = createHistory()

// Get the current location.
const location = history.location

require('bootstrap/dist/css/bootstrap.css');
// require('./bootstrapOverwrite.scss');
require('./couchWorker.scss');

let initialState: RootModel = {
    hosts: List<HostModel>([
        new HostModel(
            {
                firstName: 'Santa',
                lastName: 'Gergely',
                birthDate: new Date(1990, 2, 0),
                email: 'santagergely@gmail.com',
                address: new AddressModel({
                    country: 'Hungary',
                    city: 'Budapest'
                }),
                rating: new RatingModel(5)             
            }
        ),
        new HostModel(
            {
                firstName: 'User2',
                lastName: 'Abcd',
                birthDate: new Date(1920, 1, 12),
                email: 'user2@gmail.com',
                address: new AddressModel({
                    country: 'London',
                    city: 'UK'
                }),
                rating: new RatingModel(3.4) 
            }
        ),
        new HostModel(
            {
                firstName: 'User3',
                lastName: 'Efgh',
                birthDate: new Date(1988, 4, 20),
                email: 'user3@gmail.com',
                address: new AddressModel({
                    country: 'Hungary',
                    city: 'Budapest'
                }),
                rating: new RatingModel(4.2) 
            }
        ),
        new HostModel(
            {
                firstName: 'User3',
                lastName: 'Efgh',
                birthDate: new Date(1988, 4, 20),
                email: 'user3@gmail.com',
                address: new AddressModel({
                    country: 'Hungary',
                    city: 'Budapest'
                }),
                rating: new RatingModel(4.2) 
            }
        )      
    ]),
    user: new UserModel({
        firstName: 'New',
        lastName: 'User',
        birthDate: new Date(1980, 11, 28),
        email: 'new_user@gmail.com',
        profession: 'Drummer',
        country: 'Hungary',
        city: 'Budapest',
        id: null
    })
}

const middleware = ReactRouter.routerMiddleware(history)
let store = configureStore(initialState, middleware);

render(
    <Provider store={store}>
        <ReactRouter.ConnectedRouter history={history as any}>
             <div className='cw-root'>
                <Header/>
                <div className='cw-content'>
                    <Route path='/' component={HostsWrapper} />
                    <Route path='/register' component={ProfileWrapper} />
                </div>
            </div>
        </ReactRouter.ConnectedRouter>
    </Provider>,
    document.getElementById('couch-worker-container')
);