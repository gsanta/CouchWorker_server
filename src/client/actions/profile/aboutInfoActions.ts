import { UserModel, UserJson, fromUserJson, toUserJson } from '../../../shared/model/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { Dispatch } from 'redux';

export const UPDATE_ABOUT_INFO = 'UPDATE_ABOUT_INFO';
export const UPDATE_ABOUT_INFO_REQUEST = 'UPDATE_ABOUT_INFO_REQUEST';
export const UPDATE_ABOUT_INFO_RESPONSE = 'UPDATE_ABOUT_INFO_RESPONSE';

export function updateAboutInfoRequest(profile: UserModel) {
    return {
        type: UPDATE_ABOUT_INFO_REQUEST
    };
}

export function updateAboutInfoResponse(json: UserJson) {
    return {
        type: UPDATE_ABOUT_INFO_RESPONSE,
        user: fromUserJson(json)
    };
}

export function updateAboutInfo(profile: UserModel) {
    return function (dispatch: Dispatch<any>) {

        dispatch(updateAboutInfoRequest(profile));

        const userJson = toUserJson(profile);

        return fetch(`./api/updateUser/${userJson.userName}`, {
            method: 'POST',
            body: JSON.stringify(userJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(updateAboutInfoResponse(<any> json));
        });
    }
}