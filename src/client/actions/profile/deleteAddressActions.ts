import { AddressModel, toAddressJson } from '../../../shared/model/AddressModel';
import { UserJson, fromUserJson } from '../../../shared/model/user/UserModel';
import { Dispatch } from 'redux';

export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_RESPONSE = 'DELETE_ADDRESS_RESPONSE';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

export function deleteAddressRequest(address: AddressModel) {
    return {
        type: DELETE_ADDRESS_REQUEST
    };
}

export function deleteAddressResponse(json: UserJson) {
    return {
        type: DELETE_ADDRESS_RESPONSE,
        user: fromUserJson(json)
    };
}

export function deleteAddress(address: AddressModel, userName: string) {
    return function (dispatch: Dispatch<any>) {

        dispatch(deleteAddressRequest(address));

        const addressJson = toAddressJson(address);

        return fetch(`./api/deleteAddress/${userName}`, {
            method: 'POST',
            body: JSON.stringify(addressJson),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(deleteAddressResponse(<UserJson> json));
        });
    };
}
