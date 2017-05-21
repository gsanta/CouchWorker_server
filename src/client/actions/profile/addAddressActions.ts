import { AddressModel, toAddressJson } from '../../../shared/model/AddressModel';
import { UserJson, fromUserJson } from '../../../shared/model/user/UserModel';
import { Dispatch } from 'redux';

export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST';
export const ADD_ADDRESS_RESPONSE = 'ADD_ADDRESS_RESPONSE';
export const ADD_ADDRESS = 'ADD_ADDRESS';

export function addAddressRequest(address: AddressModel) {
    return {
        type: ADD_ADDRESS_REQUEST
    };
}

export function addAddressResponse(json: UserJson) {
    return {
        type: ADD_ADDRESS_RESPONSE,
        user: fromUserJson(json)
    };
}

export function addAddress(address: AddressModel, files: File[], userName: string) {
    return function (dispatch: Dispatch<any>) {

        dispatch(addAddressRequest(address));

        const addressJson = toAddressJson(address);

        const formData = new FormData(<HTMLFormElement> document.querySelector('.cw-address-new form'));
        files.forEach((file, index) => {
            formData.append('file', file, 'file' + index + '.png');
        });

        return fetch(`./api/addAddress/${userName}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(addAddressResponse(<UserJson> json));
        });
    };
}
