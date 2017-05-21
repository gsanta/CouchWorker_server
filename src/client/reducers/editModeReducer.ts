import { EDITMODE } from '../actions/editModeActions';
import { UPDATE_ABOUT_INFO_RESPONSE } from '../actions/profile/aboutInfoActions';
import { UPDATE_ADDRESS_RESPONSE } from '../actions/profile/addressActions';
import { ADD_ADDRESS_RESPONSE } from '../actions/profile/addAddressActions';
import { DELETE_ADDRESS_RESPONSE } from '../actions/profile/deleteAddressActions';

export function editModeReducer(editedComponent = null, action: any): boolean {
    switch (action.type) {
        case EDITMODE:
            return action.editedComponent;
        case UPDATE_ABOUT_INFO_RESPONSE:
        case UPDATE_ADDRESS_RESPONSE:
        case ADD_ADDRESS_RESPONSE:
            return false;
        default:
            return editedComponent;
    }
}
