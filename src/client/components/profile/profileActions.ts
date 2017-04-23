import { UserModel } from '../../../shared/model/user/UserModel';
import { Dispatch } from 'redux';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { AddressModel } from '../../../shared/model/AddressModel';
import { RatingModel } from '../../../shared/model/RatingModel';

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

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

export function receiveSignup(json: any) {
    return {
        type: SIGNUP,
        state: ASYNC_STATES.SUCCESS,
        user: new UserModel({
            firstName: json.firstName,
            lastName: json.lastName,
            userName: json.userName,
            birthDate: new Date(1980, 11, 28),
            email: json.email,
            uuid: '1234',
            rating: new RatingModel(5),
            profession: json.profession,
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

export function signup(profile: UserModel) {
    return function (dispatch: Dispatch<any>) {

        dispatch(requestSignup(profile));

        let profileRequest = {
            firstName: profile.getFirstName(),
            lastName: profile.getLastName(),
            birthDate: null,
            email: profile.getEmail(),
            profession: profile.getProfession(),
            addresses: profile.getAddresses()
        };

        return fetch('./api/profile', {
            method: 'POST',
            body: JSON.stringify(profileRequest),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveSignup(json));
        });
    }
}