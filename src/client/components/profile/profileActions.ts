import { UserModel, UserJson, fromUserJson } from '../../../shared/model/user/UserModel';
import { Dispatch } from 'redux';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { AddressModel } from '../../../shared/model/AddressModel';
import { RatingModel } from '../../../shared/model/RatingModel';

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const PROFILE = 'PROFILE';

export function logout() {
    return {
        type: LOGOUT
    };
}

export function requestSignup(profile: UserModel) {
    return {
        type: SIGNUP
    };
}

export function receiveSignup(json: UserJson) {
    return {
        type: SIGNUP,
        state: ASYNC_STATES.SUCCESS,
        user: fromUserJson(json)
    };
}

export function signup(profile: UserModel) {
    return function (dispatch: Dispatch<any>) {

        dispatch(requestSignup(profile));

        let profileRequest = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            birthDate: null,
            email: profile.email,
            profession: profile.profession,
            addresses: profile.addresses
        };

        return fetch('./api/profile', {
            method: 'POST',
            body: JSON.stringify(profileRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveSignup(<any> json));
        });
    };
}

export function requestProfile() {
    return {
        type: PROFILE
    };
}

export function receiveProfile(json: UserJson) {
    return {
        type: PROFILE,
        state: ASYNC_STATES.SUCCESS,
        user: fromUserJson(json)
    };
}

export function fetchProfile(userName: string) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestProfile());

        return fetch(`./api/findUser/${userName}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveProfile(<any> json));
        });
    };
}
