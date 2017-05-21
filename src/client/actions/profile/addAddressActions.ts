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

        return fetch(`./api/addAddress/${userName}`, {
            method: 'POST',
            body: createFormData(address, files)
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(addAddressResponse(<UserJson> json));
        });
    };
}

function createFormData(address: AddressModel, files: File[]): FormData {
    const formData = new FormData();
    formData.append('country', address.country);
    formData.append('city', address.city);
    formData.append('street', address.street);
    formData.append('house', address.house);
    files.forEach((file, index) => {
        formData.append('file', file, 'file' + index + '.png');
    });

    return formData;
}
