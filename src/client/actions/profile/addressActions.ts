import { UserModel, UserJson, fromUserJson, toUserJson } from '../../../shared/model/user/UserModel';
import { ASYNC_STATES } from '../../utils/AsyncStates';
import { Dispatch } from 'redux';
import { AddressModel, toAddressJson, AddressJson, fromAddressJson } from '../../../shared/model/AddressModel';
import { UrlModel } from '../../../shared/model/UrlModel';
import { ImageSrc } from '../../../shared/model/ImageSrc';
import { PreviewImageModel } from '../../../shared/model/PreviewImageModel';

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_RESPONSE = 'UPDATE_ADDRESS_RESPONSE';

export function updateAddressRequest(address: AddressModel) {
    return {
        type: UPDATE_ADDRESS_REQUEST
    };
}

export function updateAddressResponse(json: UserJson) {
    return {
        type: UPDATE_ADDRESS_RESPONSE,
        user: fromUserJson(json)
    };
}

export function updateAddress(address: AddressModel, newImages: ImageSrc[], deletedImages: ImageSrc[], userName: string) {
    return function (dispatch: Dispatch<any>) {

        dispatch(updateAddressRequest(address));

        const addressJson = toAddressJson(address);

        return fetch(`./api/updateAddress/${userName}`, {
            method: 'POST',
            body: createFormData(address, <PreviewImageModel[]> newImages, <UrlModel[]> deletedImages) //JSON.stringify(addressJson),
        })
        .then(response => response.json())
        .then((json: any) => {
            dispatch(updateAddressResponse(<UserJson> json));
        });
    };
}

function createFormData(address: AddressModel, newImages: PreviewImageModel[], deletedImages: UrlModel[]): FormData {
    const formData = new FormData();

    Object.keys(address).map(key => formData.append(key, address[key]));
    newImages.forEach((image, index) => {
        formData.append('file', image.file, 'file' + index + '.png');
    });

    const deletedImageNames = deletedImages.map(image => image.fileName);
    formData.append('deletedImages', JSON.stringify(deletedImageNames));
    return formData;
}

