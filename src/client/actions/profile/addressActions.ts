import { UserModel, UserJson, fromUserJson, toUserJson } from '../../../shared/model/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { Dispatch } from 'redux';
import { AddressModel, toAddressJson, AddressJson, fromAddressJson } from '../../../shared/model/AddressModel';

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_RESPONSE = 'UPDATE_ADDRESS_RESPONSE';

export function updateAddressRequest(address: AddressModel) {
    return {
        type: UPDATE_ADDRESS_REQUEST
    };
}

export function updateAddressResponse(json: AddressJson) {
    return {
        type: UPDATE_ADDRESS_RESPONSE,
        user: fromAddressJson(json)
    };
}

export function updateAddress(address: AddressModel, userName: string) {
    return function (dispatch: Dispatch<any>) {

        dispatch(updateAddressRequest(address));

        const addressJson = toAddressJson(address);

        return fetch(`./api/updateAddress/${userName}`, {
            method: 'POST',
            body: JSON.stringify(addressJson),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(updateAddressResponse(<AddressJson> json));
        });
    }
}