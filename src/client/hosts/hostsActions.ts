import { List } from 'immutable';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { Dispatch } from 'redux';
import { UserModel } from '../../shared/model/user/UserModel';
import { RatingModel } from '../../shared/model/RatingModel';
import { AddressModel } from '../../shared/model/AddressModel';

export const FETCH_HOSTS = 'FETCH_HOSTS';

export function requestHosts() {
    return {
        type: FETCH_HOSTS
    }
}

export function receiveHosts(hosts: List<UserModel>) {
    return {
        type: FETCH_HOSTS,
        state: ASYNC_STATES.SUCCESS,
        hosts: hosts
    }
}

export function fetchHosts() {
    return function (dispatch: Dispatch<any>) {

        dispatch(requestHosts());

        return fetch('./api/findUsers/1', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveHosts(parseHosts(json)));
        });
    }
}

function parseHosts(json: any): List<UserModel> {
    const hosts = json.map(host => {
        return new UserModel({
            firstName: host.firstName,
            lastName: host.lastName,
            profession: '',
            userName: '',
            birthDate: null,
            email: host.email,
            rating: new RatingModel(host.rating.rating),
            uuid: null,
            addresses: [
                new AddressModel({
                    country: host.country,
                    city: host.city,
                    uuid: null
                })
            ]
        });
    });

    return List<UserModel>(hosts);
}