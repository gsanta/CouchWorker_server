import { List } from 'immutable';
import { ASYNC_STATES } from '../utils/AsyncStates';
import { Dispatch } from 'redux';
import { UserModel, UserJson } from '../../shared/model/user/UserModel';
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
            dispatch(receiveHosts(parseHosts(<any> json)));
        });
    }
}

function parseHosts(json: UserJson[]): List<UserModel> {
    const hosts = json.map(host => {
        return UserModel.fromJson(host);
    });

    return List<UserModel>(hosts);
}