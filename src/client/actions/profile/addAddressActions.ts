import { AddressModel, toAddressJson } from '../../../shared/model/AddressModel';
import { UserJson, fromUserJson } from '../../../shared/model/user/UserModel';
import { Dispatch } from 'redux';
import { PreviewImageModel } from '../../../shared/model/PreviewImageModel';
import { ImageSrc } from '../../../shared/model/ImageSrc';

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

export function addAddress(address: AddressModel, images: ImageSrc[], userName: string) {
    return function (dispatch: Dispatch<any>) {

        dispatch(addAddressRequest(address));

        const addressJson = toAddressJson(address);

        return fetch(`./api/addAddress/${userName}`, {
            method: 'POST',
            body: createFormData(address, <PreviewImageModel[]> images)
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(addAddressResponse(<UserJson> json));
        });
    };
}

function createFormData(address: AddressModel, images: PreviewImageModel[]): FormData {
    const formData = new FormData();

    Object.keys(address).map(key => formData.append(key, address[key]));
    images.forEach((image, index) => {
        formData.append('file', image.file, 'file' + index + '.png');
    });

    return formData;
}

