import { List } from 'immutable';
import { HostModel } from '../HostModel';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { Dispatch } from 'redux';

export const FETCH_HOSTS = 'FETCH_HOSTS';

export function requestHosts() {
    return {
        type: FETCH_HOSTS
    }
}

export function receiveHosts(hosts: List<HostModel>) {
    return {
        type: FETCH_HOSTS,
        state: ASYNC_STATES.SUCCESS,
        hosts: hosts
    }
}

export function fetchHosts() {
    return function (dispatch: Dispatch<any>) {

        dispatch(requestHosts());

        return fetch('./api/hosts', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveHosts(parseHosts(json)));
        });
    }
}

function parseHosts(json: any): List<HostModel> {
    const hosts = json.map(host => {
        return new HostModel({
            firstName: host.firstName,
            lastName: host.lastName,
            birthDate: null,
            email: host.email,
            rating: host.rating,
            country: host.country,
            city: host.city
        });
    });

    return List<HostModel>(hosts);
}