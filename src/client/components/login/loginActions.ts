import { Dispatch } from 'redux';
// import 'whatwg-fetch';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { UserModel } from '../../../shared/model/user/UserModel';
import { LoginModel } from '../../../shared/model/login/LoginModel';
import { AddressModel } from '../../../shared/model/AddressModel';
import { RatingModel } from '../../../shared/model/RatingModel';

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
            userName: json.userName,
            birthDate: new Date(1980, 11, 28),
            email: json.email,
            profession: json.profession,
            rating: new RatingModel(5),
            uuid: 'abcd',
            addresses: [
                new AddressModel({
                    country: json.country,
                    city: json.city,
                    uuid: null
                })
            ]
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