import { Dispatch } from 'redux';
// import 'whatwg-fetch';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { UserModel, UserJson } from '../../../shared/model/user/UserModel';
import { LoginModel } from '../../../shared/model/login/LoginModel';
import { AddressModel } from '../../../shared/model/AddressModel';
import { RatingModel } from '../../../shared/model/RatingModel';

export const LOGIN = 'LOGIN';

export function requestLogin(login: LoginModel) {
    return {
        type: LOGIN
    };
}

export function receiveLogin(json: UserJson) {
    return {
        type: LOGIN,
        state: ASYNC_STATES.SUCCESS,
        user: UserModel.fromJson(json)
    };
}

export function login(login: LoginModel) {
    return function (dispatch: Dispatch<any>) {

        dispatch(requestLogin(login));

        let loginRequest = {
            email: login.getEmail(),
            password: login.getPassword()
        };

        return fetch('./api/login', {
            method: 'POST',
            body: JSON.stringify(loginRequest),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveLogin(<any> json));
        });
    }
}