import { Dispatch } from 'redux';
import { LoginModel } from './LoginModel';
// import 'whatwg-fetch';
import { UserModel } from '../../../domain/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';

export const LOGIN = 'LOGIN';

export function requestLogin(login: LoginModel) {
    return {
        type: LOGIN
    };
}

export function receiveLogin(json: any) {
    return {
        type: LOGIN,
        state: ASYNC_STATES.SUCCESS,
        user: new UserModel({
            firstName: json.firstName,
            lastName: json.lastName,
            birthDate: new Date(1980, 11, 28),
            email: json.email,
            profession: json.profession,
            country: json.country,
            city: json.city,
            id: null
        })
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
            dispatch(receiveLogin(json));
        });
    }
}